import { GraphQLObjectType } from 'graphql';
import { NoDataError, FieldTransform, TransformType } from '@graphback/runtime';
import { getDatabaseArguments } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider } from '@graphback/runtime-mongo';

/**
 * Mongo provider that contains special handlers for offix conflict resolution format:
 *
 * https://offix.dev/docs/conflict-server#structure-of-the-conflict-error
 */
export class DatasyncMongoDBDataProvider<Type = any, GraphbackContext = any> extends MongoDBDataProvider<Type, GraphbackContext> {

  public constructor(baseType: GraphQLObjectType, client: any) {
    super(baseType, client);
  }

  public async create(data: any): Promise<Type> {
    if (!data.version) {
      data.version = 1;
    }

    return super.create(data);
  }


  public async update(data: any): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);

    if (!idField.value) {
      throw new NoDataError(`Cannot update ${this.collectionName} - missing ID field`)
    }

    // TODO Can be improved by conditional updates
    const queryResult = await this.db.collection(this.collectionName).find({ _id: new ObjectId(idField.value) }).toArray();
    if (queryResult && queryResult[0]) {
      queryResult[0][idField.name] = queryResult[0]._id;
      if (data.version !== queryResult[0].version) {
        const conflictError: any = new Error();
        conflictError.conflictInfo = { serverState: queryResult[0], clientState: data };
        throw conflictError
      }
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      data.version = data.version + 1;


      // TODO use findOneAndUpdate to check consistency afterwards
      return super.update(data);
    }

    throw new NoDataError(`Could not find document to update in ${this.collectionName}`);
  }
}
