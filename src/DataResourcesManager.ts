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

  constructor(dbConnection: Knex, tablePrefix: string = "gen_") {
    this.dbConnection = dbConnection;
    this.tablePrefix = tablePrefix;
  }

  public createDatabaseResources(types: Type[]): Promise<void> {
    types.forEach((gqlType: Type) => {
      const tableName = this.getTableName(gqlType.name);
      if (this.dbConnection.schema.hasTable(tableName)) {
        logger.warn(`Table exist! Skipping table creation for ${tableName}`)

        return;
      }

      this.dbConnection.schema.createTable(tableName, (table: Knex.TableBuilder) => {
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
    })

    // DEBT: Return data that can be used later
    return Promise.resolve();
  }

  public updateDatabaseResourcesFor(updates: IDataLayerUpdate[]): Promise<void> {
    throw new Error("Method not implemented by Dara.");
  }

  private getTableName(name: string): string {
    return this.tablePrefix + name;
  }
}
