import { getDatabaseArguments, metadataMap, GraphbackContext, NoDataError, TransformType, FieldTransform, GraphbackOrderBy, GraphbackPage, QueryFilter, StringInput, ModelDefinition } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider, applyIndexes } from '@graphback/runtime-mongo';
import { ConflictError, ConflictStateMap } from "../util";
import { DataSyncProvider } from "./DataSyncProvider";

/**
 * Mongo provider that attains data synchronization using soft deletes
 */
export class DataSyncMongoDBDataProvider<Type = any> extends MongoDBDataProvider<Type> implements DataSyncProvider {

  public constructor(model: ModelDefinition, client: any) {
    super(model, client);
    applyIndexes([
      {
        key: {
          _deleted: 1
        }
      }
    ], this.db.collection(this.collectionName)).catch((e: any) => {
      throw e;
    });
    this.coerceTSFields = true;
  }

  public async create(data: any, context: GraphbackContext): Promise<Type> {
    data._deleted = false;
    data._version = 1;

    return super.create(data, context);
  }

  public async update(data: any, context: GraphbackContext): Promise<Type> {
    const conflict = await this.checkForConflicts(data, context);

    if (conflict !== undefined) {
      throw new ConflictError(conflict);
    }

    const currentVersion = data._version;
    if (typeof (currentVersion) === "number") {
      data._version = currentVersion + 1;
    }

    // TODO use findOneAndUpdate to check consistency afterwards
    return super.update(data, context);
  }

  public async delete(data: any, context: GraphbackContext): Promise<Type> {
    const conflict = await this.checkForConflicts(data, context);
    if (conflict !== undefined) {
      throw new ConflictError(conflict);
    }

    const { idField } = getDatabaseArguments(this.tableMap, data);
    const currentVersion = data._version;
    data = {};
    if (typeof (currentVersion) === "number") {
      data._version = currentVersion + 1;
    }

    this.fieldTransformMap[TransformType.UPDATE]
      .forEach((f: FieldTransform) => {
        data[f.fieldName] = f.transform();
      });

    data._deleted = true;
    const objectId = new ObjectId(idField.value);
    const projection = this.buildProjectionOption(context);
    const result = await this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId }, { $set: data }, { projection, returnOriginal: false });
    if (result.ok) {
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
      _deleted: { $ne: true }
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

    filter._deleted = { ne: true };

    return super.findBy(filter, context, page, orderBy);
  }

  public async count(filter: any): Promise<number> {
    if (filter === undefined) {
      filter = {};
    }

    filter._deleted = { ne: true };

    return super.count(filter);
  }

  public sync(lastSync: string, context: GraphbackContext, filter?: any): Promise<Type[]> {

    return super.findBy({
      ...filter,
      updatedAt: {
        gt: lastSync
      }
    }, context, undefined, undefined);
  }

  protected async checkForConflicts(clientData: any, context: GraphbackContext): Promise<ConflictStateMap> {
    const { idField } = getDatabaseArguments(this.tableMap, clientData);
    const { fieldNames } = metadataMap;

    if (!idField.value) {
      throw new NoDataError(`Couldn't get document from ${this.collectionName} - missing ID field`)
    }

    const projection = this.buildProjectionOption(context);

    if (projection) {
      projection._version = 1;
      projection._deleted = 1
    }

    const queryResult = await this.db.collection(this.collectionName).findOne({ _id: new ObjectId(idField.value), _deleted: { $ne: true } }, { projection });
    if (queryResult) {
      queryResult[idField.name] = queryResult._id;
      if (
        queryResult._version !== undefined &&
        clientData._version !== queryResult._version
      ) {

        return { serverState: queryResult, clientState: clientData };
      }

      return undefined;
    }

    throw new NoDataError(`Could not find any such documents from ${this.collectionName}`);
  }
}
