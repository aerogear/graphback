import { getDatabaseArguments, metadataMap, GraphbackContext, NoDataError, TransformType, FieldTransform, GraphbackOrderBy, GraphbackPage, QueryFilter, StringInput, ModelDefinition } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider, applyIndexes } from '@graphback/runtime-mongo';
import { DataSyncFieldNames, getDataSyncAnnotationData } from "../util";
import { DataSyncProvider } from "./DataSyncProvider";

/**
 * Mongo provider that attains data synchronization using soft deletes
 */
export class DataSyncMongoDBDataProvider<Type = any> extends MongoDBDataProvider<Type> implements DataSyncProvider {
  protected TTLinSeconds: number;

  public constructor(model: ModelDefinition, client: any) {
    super(model, client);
    applyIndexes([
      {
        key: {
          [DataSyncFieldNames.deleted]: 1
        }
      },
      {
        key: {
          [DataSyncFieldNames.ttl]: 1
        },
        expireAfterSeconds: 0
      }
    ], this.db.collection(this.collectionName)).catch((e: any) => {
      throw e;
    });
    const DataSyncAnnotationData = getDataSyncAnnotationData(model);
    this.TTLinSeconds = parseInt(DataSyncAnnotationData.ttl, 10);
    if (isNaN(this.TTLinSeconds)) {
      throw Error(`TTL for model:"${model.graphqlType.name}" not found in the schema`);
    }
    this.coerceTSFields = true;
  }

  public async create(data: any, context: GraphbackContext): Promise<Type> {
    data[DataSyncFieldNames.deleted] = false;
    data[DataSyncFieldNames.lastUpdatedAt] = Date.now();

    return super.create(data, context);
  }

  public async update(data: any, context: GraphbackContext): Promise<Type> {
    
    const { idField } = getDatabaseArguments(this.tableMap, data);
    
    if (!idField.value) {
      throw new NoDataError(`Cannot update ${this.collectionName} - missing ID field`)
    }
    
    this.fieldTransformMap[TransformType.UPDATE]
      .forEach((f: FieldTransform) => {
        data[f.fieldName] = f.transform(f.fieldName);
      });
    
    data[DataSyncFieldNames.lastUpdatedAt] = Date.now();
    const objectId = new ObjectId(idField.value);
    const projection = this.buildProjectionOption(context);
    const result = await this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId, [DataSyncFieldNames.deleted]: { $ne: true } }, { $set: data }, { returnOriginal: false, projection });
    if (result?.value) {
      return result.value;
    }
    throw new NoDataError(`Cannot update ${this.collectionName}`);
  }

  public async delete(data: any, context: GraphbackContext): Promise<Type> {    
    const { idField } = getDatabaseArguments(this.tableMap, data);
    data = {};
    data[DataSyncFieldNames.lastUpdatedAt] = Date.now();

    this.fieldTransformMap[TransformType.UPDATE]
      .forEach((f: FieldTransform) => {
        data[f.fieldName] = f.transform();
      });

    data[DataSyncFieldNames.deleted] = true;
    data[DataSyncFieldNames.ttl] = new Date(Date.now() + (this.TTLinSeconds * 1000));
    const objectId = new ObjectId(idField.value);
    const projection = this.buildProjectionOption(context);
    const result = await this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId, [DataSyncFieldNames.deleted]: { $ne: true } }, { $set: data }, { returnOriginal: false, projection });
    if (result?.value) {
      return result.value;
    }

    throw new NoDataError(`Could not delete from ${this.collectionName}`);
  }

  public async findOne(filter: any, context: GraphbackContext): Promise<Type> {
    if (filter.id) {
      filter = { _id: new ObjectId(filter.id) }
    }
    const projection = this.buildProjectionOption(context);
    const query = this.db.collection(this.collectionName).findOne({
      ...filter,
      [DataSyncFieldNames.deleted]: { $ne: true }
    }, { projection });
    const data = await query;

    if (data) {
      return data;
    }
    throw new NoDataError(`Cannot find a result for ${this.collectionName} with filter: ${JSON.stringify(filter)}`);
  }

  public async findBy(filter: QueryFilter<Type> | any, context: GraphbackContext, page?: GraphbackPage, orderBy?: GraphbackOrderBy): Promise<Type[]> {
    if (filter === undefined) {
      filter = {};
    }

    filter[DataSyncFieldNames.deleted] = { ne: true };

    return super.findBy(filter, context, page, orderBy);
  }

  public async count(filter: any): Promise<number> {
    if (filter === undefined) {
      filter = {};
    }

    filter[DataSyncFieldNames.deleted] = { ne: true };

    return super.count(filter);
  }

  public sync(lastSync: Date, context: GraphbackContext, filter?: any, limit?: number): Promise<Type[]> {

    return super.findBy({
      ...filter,
      [DataSyncFieldNames.lastUpdatedAt]: {
        ge: lastSync.valueOf()
      }
    }, context, { limit }, undefined);
  }
}
