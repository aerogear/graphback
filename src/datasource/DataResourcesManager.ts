import { Field, Type } from 'graphql-codegen-core';
import * as Knex from 'knex'
import { logger } from '../logger'
import { DatabaseContextProvider } from './DatabaseContextProvider'
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
  createDatabaseResources(context: DatabaseContextProvider, types: Type[]): Promise<void>;

  //Create relations among tables in database.

  createDatabaseRelations(context: DatabaseContextProvider, types: Type[]): Promise<void>;

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

  // tslint:disable-next-line:typedef
  private primitiveTypesMapping = {
    String: 'string',
    Int: 'decimal',
    Float: 'float',
    Boolean: 'boolean'
  }

  constructor(dbConnectionOptions: Knex.ConnectionConfig) {
    this.dbConnection = Knex({
      client: 'pg',
      connection: dbConnectionOptions
    });
  }

  public async createDatabaseResources(context: DatabaseContextProvider, types: Type[]): Promise<void> {
    for (const gqlType of types) {
      const tableName = context.getFieldName(gqlType)
      const hasTable = await this.dbConnection.schema.hasTable(tableName)
      if (hasTable) {
        logger.warn(`Table exist! Skipping table creation for ${tableName}`)
      } else {
        await this.dbConnection.schema.createTable(tableName, (table: Knex.TableBuilder) => {
          table.increments();
          gqlType.fields.forEach((gqlField: Field) => {
            const method = this.primitiveTypesMapping[gqlField.type];
            if (method) {
              table[method](gqlField.name);
            }
          })
          table.timestamps();
        })
      }
    }

    return Promise.resolve();
  }

  public createDatabaseRelations(context: DatabaseContextProvider, types: Type[]): Promise<void> {
    logger.info("Creating relations")
    for (const gqlType of types) {
      let tableName = context.getFieldName(gqlType)
      let currentTable = tableName
      gqlType.fields.forEach(async(gqlField: Field) => {
        if(gqlField.isType) {
          if("OneToMany" in gqlField.directives) {
            let fieldname = gqlField.directives['OneToMany'].field
            if(!fieldname) {
              fieldname = `${currentTable}Id`
            }
            if(gqlField.isArray) {
              tableName = gqlField.type.toLowerCase()
              const hasColumn = await this.dbConnection.schema.hasColumn(tableName, fieldname)
              if(hasColumn) {
                logger.info("skipping relation creation")
              } else {
                await this.dbConnection.schema.alterTable(tableName, (table: Knex.TableBuilder) => {
                  table.integer(fieldname).unsigned()
                  table.foreign(fieldname).references('id').inTable(currentTable)
                })
              }
            } else {
              throw new Error("Incorrect syntax declaration. Declaration should be an array.")
            }
          }
          else if("ManyToMany" in gqlField.directives) {
            let newTable = gqlField.directives['ManyToMany'].tablename
            if(!newTable) {
              newTable = `${currentTable}_${gqlField.type}`
            }
            const hasTable = await this.dbConnection.schema.hasTable(newTable)
            if(gqlField.isArray) {
              if(hasTable) {
                logger.info("skipping relation creation")
              } else {
                let tableOne = gqlField.type.toLowerCase()
                let tableTwo = currentTable
                let fieldOne = `${tableOne}Id`
                let fieldTwo = `${currentTable}Id`
                await this.dbConnection.schema.createTable(newTable, (table: Knex.TableBuilder) => {
                  table.integer(fieldOne).unsigned()
                  table.foreign(fieldOne).references('id').inTable(tableOne)
                  table.integer(fieldTwo).unsigned()
                  table.foreign(fieldTwo).references('id').inTable(tableTwo)
                })
              }
            } else {
              throw new Error("Incorrect syntax declaration. Declaration should be an array.")
            }
          } 
          else if ('OneToOne' in gqlField.directives) {
            let fieldname = gqlField.directives['OneToOne'].field
            if(!fieldname) {
              fieldname = `${currentTable}Id`
            }
            tableName = gqlField.type.toLowerCase()
            const hasColumn = await this.dbConnection.schema.hasColumn(tableName, fieldname)
            if(hasColumn) {
              logger.info("skipping relation creation")
            } else {
              await this.dbConnection.schema.alterTable(tableName, (table: Knex.TableBuilder) => {
                table.integer(fieldname).unique().unsigned()
                table.foreign(fieldname).references('id').inTable(currentTable)
              })
            }
          }
        }
      })
    }

    return Promise.resolve();
  }

  public updateDatabaseResourcesFor(updates: IDataLayerUpdate[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public getConnection(): Knex {
    return this.dbConnection;
  }

}
