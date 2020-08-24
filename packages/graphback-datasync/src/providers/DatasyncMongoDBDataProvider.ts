import { getDatabaseArguments, NoDataError, TransformType, FieldTransform, GraphbackOrderBy, GraphbackPage, QueryFilter, ModelDefinition, FindByArgs } from '@graphback/core';
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
      // Default TTL of 2 days
      this.TTLinSeconds = 172800
    }
    this.coerceTSFields = true;
  }

  public async create(data: any): Promise<Type> {
    data[DataSyncFieldNames.deleted] = false;
    data[DataSyncFieldNames.lastUpdatedAt] = Date.now();

    return super.create(data);
  }

  public async update(data: any, selectedFields?: string[]): Promise<Type> {
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
    const projection = this.buildProjectionOption(selectedFields);
    const result = await this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId, [DataSyncFieldNames.deleted]: { $ne: true } }, { $set: data }, { returnOriginal: false, projection });
    if (result?.value) {
      return result.value;
    }
    throw new NoDataError(`Cannot update ${this.collectionName}`);
  }

  public async delete(data: any, selectedFields?: string[]): Promise<Type> {
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
    const projection = this.buildProjectionOption(selectedFields);
    const result = await this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId, [DataSyncFieldNames.deleted]: { $ne: true } }, { $set: data }, { returnOriginal: false, projection });
    if (result?.value) {
      return result.value;
    }

    throw new NoDataError(`Could not delete from ${this.collectionName}`);
  }

  public async findOne(filter: any, selectedFields?: string[]): Promise<Type> {
    if (filter.id) {
      filter = { _id: new ObjectId(filter.id) }
    }
    const projection = this.buildProjectionOption(selectedFields);
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

  public async findBy(args?: FindByArgs, selectedFields?: string[]): Promise<Type[]> {
    if (!args) {
      args = {
        filter: {}
      }
    } else if (!args.filter) {
      args.filter = {};
    }

    args.filter[DataSyncFieldNames.deleted] = { ne: true };

    return super.findBy(args, selectedFields);
  }

  public async count(filter: QueryFilter): Promise<number> {
    filter = filter || {}

    filter[DataSyncFieldNames.deleted] = { ne: true };

    return super.count(filter);
  }

  public sync(lastSync: Date, selectedFields?: string[], filter?: QueryFilter, limit?: number): Promise<Type[]> {
    filter = filter || {};
    
    const args: FindByArgs = {
      filter: {
        ...filter,
        [DataSyncFieldNames.lastUpdatedAt]: {
          ge: lastSync.valueOf()
        }
      },
      page: {
        limit
      }
    }

    return super.findBy(args, selectedFields);
  }
}
