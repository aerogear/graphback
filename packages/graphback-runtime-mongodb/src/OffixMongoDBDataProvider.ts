import { GraphQLObjectType } from 'graphql';
import { NoDataError } from '@graphback/runtime';
import { getDatabaseArguments } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider } from './MongoDBDataProvider';

/**
 * Mongo provider that contains special handlers for offix conflict resolution format:
 *
 * https://offix.dev/docs/conflict-server#structure-of-the-conflict-error
 */
export class OffixMongoDBDataProvider<Type = any, GraphbackContext = any> extends MongoDBDataProvider<Type, GraphbackContext> {
  protected updatedAtField: string;
  protected createdAtField: string;

  public constructor(baseType: GraphQLObjectType, client: any) {
    super(baseType, client);
    this.createdAtField = undefined;
    this.updatedAtField = undefined;

    Object.keys(baseType.getFields()).forEach((k: string) => {
      if (baseType.getFields()[k]?.extensions?.directives) {
        baseType.getFields()[k].extensions.directives.forEach((directive: any) => {
          if (directive?.name === "createdAt") {
            if (this.createdAtField === undefined) {
              this.createdAtField = baseType.getFields()[k]?.name;
            } else {
              throw Error("Cannot have more than one field with createdAt directive");
            }
          }
          if (directive?.name === "updatedAt") {
            if (this.updatedAtField === undefined) {
              this.updatedAtField = baseType.getFields()[k]?.name;
            } else {
              throw Error("Cannot have more than one field with updatedAt directive");
            }
          }
        });
      }
    });
  }

  public async create(data: any): Promise<Type> {
    if (!data.version) {
      data.version = 1;
    }
    const o = await super.create(data);
    let res = o as any;
    if (this.updatedAtField) {
      res = await super.update({
        ...res,
        id: res.id,
        [this.updatedAtField]: (new ObjectId(res.id)).getTimestamp()
      });
    }

    return this.mapFields(res);
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
      if (this.updatedAtField) {
        data[this.updatedAtField] = new Date();
      }
      // TODO use findOneAndUpdate to check consistency afterwards
      const result = await this.db.collection(this.collectionName).updateOne({ _id: new ObjectId(idField.value) }, { $set: data });
      if (result.result?.ok) {
        return this.mapFields(data);
      }
    }

    throw new NoDataError(`Cannot update ${this.collectionName}`);
  }

  protected mapFields(document: any): any {
    document = super.mapFields(document);
    if (this.createdAtField) {
      document[this.createdAtField] = new ObjectId(document.id).getTimestamp();
    }

    return document;
  }
}
