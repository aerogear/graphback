import { GraphQLObjectType } from 'graphql';
import { getDatabaseArguments, metadataMap, GraphbackContext, NoDataError, TransformType, FieldTransform, GraphbackOrderBy, GraphbackPage } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider, applyIndexes } from '@graphback/runtime-mongo';
import { ConflictError, ConflictStateMap } from "../util";
import { DataSyncProvider } from "./DataSyncProvider";
import { DeltaProvider } from "./DeltaProvider";

/**
 * Mongo provider that attains data synchronization using soft deletes
 */
export class DeltaDBDataProvider<Type = any> extends MongoDBDataProvider<Type> implements DataSyncProvider {
  protected deltaProvider: DeltaProvider;

  public constructor(baseType: GraphQLObjectType, client: any) {
    super(baseType, client);
    applyIndexes([
      {
        key: {
          _deleted: 1
        }
      }
    ], this.db.collection(this.collectionName)).catch((e: any) => {
      throw e;
    });
    this.deltaProvider = new DeltaProvider(baseType, client);
  }

  public async create(data: any, context: GraphbackContext): Promise<Type> {
    data._deleted = false;

    const res = await super.create(data, context);

    this.deltaProvider.insertDiff(res).catch((e: any) => {
      console.error(`Error: Couldn't insert into delta table: ${e}`);
    })
    
    return this.mapFields(res);
  }

  public async update(data: any, context: GraphbackContext): Promise<Type> {
    const conflict = await this.checkForConflicts(data, context);

    if (conflict !== undefined) {
      throw new ConflictError(conflict);
    }

    // TODO use findOneAndUpdate to check consistency afterwards
    const { idField } = getDatabaseArguments(this.tableMap, data);

    if (!idField.value) {
      throw new NoDataError(`Cannot update ${this.collectionName} - missing ID field`)
    }

    this.fieldTransformMap[TransformType.UPDATE]
      .forEach((f: FieldTransform) => {
        data[f.fieldName] = f.transform(f.fieldName);
      });

    const objectId = new ObjectId(idField.value);
    const result = await this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId }, { $set: data }, { returnOriginal: false });
    if (result.ok) {
      
      this.deltaProvider.insertDiff(result.value).catch((e: any) => {
        console.error(`Error: Couldn't insert into delta table: ${e}`);
      })

      return this.mapFields(result.value)
      
    }
    throw new NoDataError(`Cannot update ${this.collectionName}`);


  }

  public async delete(data: any, context: GraphbackContext): Promise<Type> {
    const conflict = await this.checkForConflicts(data, context);
    if (conflict !== undefined) {
      throw new ConflictError(conflict);
    }

    const { idField } = getDatabaseArguments(this.tableMap, data);
    data = {};

    this.fieldTransformMap[TransformType.UPDATE]
      .forEach((f: FieldTransform) => {
        data[f.fieldName] = f.transform();
      });

    data._deleted = true;
    const objectId = new ObjectId(idField.value);
    const projection = this.buildProjectionOption(context);
    const result = await this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId }, { $set: data }, {/*projection,*/ returnOriginal: false });
    if (result.ok) {
      this.deltaProvider.insertDiff(result.value).catch((e: any) => {
        console.error(`Error: Couldn't insert into delta table: ${e}`);
      })

      return this.mapFields(result.value);
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
      _deleted: { $ne: true}
    }, { projection });
    const data = await query;

    if (data) {
      return this.mapFields(data);
    }
    throw new NoDataError(`Cannot find a result for ${this.collectionName} with filter: ${JSON.stringify(filter)}`);
  }

  public async findBy(filter: any, context: GraphbackContext, page?: GraphbackPage, orderBy?: GraphbackOrderBy): Promise<Type[]> {
    if (filter === undefined) {
      filter = {};
    }

    filter._deleted = { ne: true };

    return super.findBy(filter, context, page, orderBy);
  }

  public async count(filter: any): Promise<number> {
    if (filter === undefined) {
      filter = {};
    }

    filter._deleted = { ne: true};

    return super.count(filter);
  }

  public sync(lastSync: string, context: GraphbackContext, filter?: any): Promise<Type[]> {

    return this.deltaProvider.sync(parseInt(lastSync, 10)).then((res: any[]) => {
      return res.map((doc: any) => {
        return this.mapFields(doc);
      })
    });
  }

  protected async checkForConflicts(clientData: any, context: GraphbackContext): Promise<ConflictStateMap> {
    const { idField } = getDatabaseArguments(this.tableMap, clientData);
    const { fieldNames } = metadataMap;

    if (!idField.value) {
      throw new NoDataError(`Couldn't get document from ${this.collectionName} - missing ID field`)
    }
    const projection = {
      ...this.buildProjectionOption(context),
      [fieldNames.updatedAt]: 1,
      _deleted: 1
    };
    const queryResult = await this.db.collection(this.collectionName).findOne({ _id: new ObjectId(idField.value), _deleted: { $ne: true} }, {});
    if (queryResult) {
      queryResult[idField.name] = queryResult._id;
      if (
        queryResult[fieldNames.updatedAt] !== undefined &&
        clientData[fieldNames.updatedAt].toString() !== queryResult[fieldNames.updatedAt].toString()
      ) {
        return { serverState: queryResult, clientState: clientData };
      }

      return undefined;
    }

    throw new NoDataError(`Could not find any such documents from ${this.collectionName}`);
  }
}
