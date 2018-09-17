import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { Field, Type } from 'graphql-codegen-core';
import * as Knex from 'knex'
import { logger } from './logger'

/**
 * Represents update for data type
 */
export interface IDataLayerUpdate {
  oldType: Type,
  newType: Type
}

/**
 * Interface for creating atabase resources .
 * For example for relational databases implementors will execute DDL queries into database
 */
export interface IDataLayerResourcesManager {

  /**
   * Create resources for provided schema
   *
   * @param types that should be used to gather resources
   */
  createDatabaseResources(types: Type[]): Promise<void>;

  /**
   * Update database resources after they are created
   *
   * @param updates to types
   */
  updateDatabaseResourcesFor(updates: IDataLayerUpdate[]): Promise<void>;

}

/**
 * Manager for Postgres database
 */
export class PostgresSchemaManager implements IDataLayerResourcesManager {
  private dbConnection: Knex;
  private tablePrefix: string;

  // tslint:disable-next-line:typedef
  private primitiveTypesMapping = {
    String: 'string',
    Int: 'decimal',
    Float: 'float',
    Boolean: 'boolean',
    ID: 'increments'
  }

  constructor(dbConnectionOptions: Knex.ConnectionConfig, tablePrefix: string = "gen_") {
    this.dbConnection = Knex({
      client: 'pg',
      connection: dbConnectionOptions
    });
    this.tablePrefix = tablePrefix;
  }

  public async createDatabaseResources(types: Type[]): Promise<void> {
    for (const gqlType of types) {
      const tableName = this.getTableName(gqlType.name);
      const hasTable = await this.dbConnection.schema.hasTable(tableName)
      if (hasTable) {
        logger.warn(`Table exist! Skipping table creation for ${tableName}`)
      } else {
        await this.dbConnection.schema.createTable(tableName, (table: Knex.TableBuilder) => {
          table.increments();
          gqlType.fields.forEach((gqlField: Field) => {
            const method = this.primitiveTypesMapping[gqlField.fieldType];
            if (method) {
              table[method](gqlField.name);
            } else {
              // DEBT: Relationships :)
              // DEBT: Mapping scalars
              // DEBT: Input type support
              logger.error(`Using unsupported field ${gqlField.name} in ${gqlType.name} type`)
            }
          })
          table.timestamps();
        })
      }
    }

    return Promise.resolve();
  }

  public updateDatabaseResourcesFor(updates: IDataLayerUpdate[]): Promise<void> {
    throw new Error("Method not implemented by Dara.");
  }

  public getConnection(): Knex {
    return this.dbConnection;
  }

  private getTableName(name: string): string {
    return this.tablePrefix + name.toLowerCase();
  }
}
