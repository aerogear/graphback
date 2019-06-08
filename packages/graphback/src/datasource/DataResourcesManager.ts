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

  /**
   *  Create relations among tables in database.
   */
  createDatabaseRelations(context: DatabaseContextProvider, types: Type[]): Promise<void>;

  /**
   * Update database resources after they are created
   *
   * @param updates to types
   */
  updateDatabaseResourcesFor(updates: IDataLayerUpdate[]): Promise<void>;

}

/**
 * Types of database Relations
 * 1-1, 1:m, m:n
 */
enum Relation {
  oneToOne = "OneToOne",
  oneToMany = "OneToMany",
  manyToMany = "ManyToMany"
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
      const tableName: string = context.getFieldName(gqlType)
      const hasTable = this.dbConnection.schema.hasTable(tableName)
      if (hasTable) {
        logger.warn(`Table exist! Skipping table creation for ${tableName}`)
      } else {
        this.dbConnection.schema.createTable(tableName, (table: Knex.TableBuilder) => {
          table.increments();
          for (const gqlField of gqlType.fields) {
            const method = this.primitiveTypesMapping[gqlField.type];
            if (method) {
              table[method](gqlField.name);
            }
          }
          table.timestamps();
        })
      }
    }

    return Promise.resolve();
  }

  public async createDatabaseRelations(context: DatabaseContextProvider, types: Type[]): Promise<void> {
    logger.info("Creating relations")
    for (const gqlType of types) {
      const tableName = context.getFieldName(gqlType)
      const currentTable = tableName
      for (const gqlField of gqlType.fields) {
        if(gqlField.isType) {
          if(Relation.manyToMany in gqlField.directives) {
            this.createManyToManyRelation(currentTable, gqlField)
          }
          else if(Relation.oneToMany in gqlField.directives || gqlField.isArray) {
            this.createOneToManyRelation(currentTable, gqlField, tableName)
          } 
          else if (Relation.oneToOne in gqlField.directives || !gqlField.isArray) {
            this.createOneToOneRelation(currentTable, gqlField, tableName)
          }
        }
      }
    }

    return Promise.resolve();
  }

  /**
   * Create 1:1 relation between tables
   * @param currentTable current table being parsed
   * @param gqlField properties of the field
   * @param tableName table to create relation in
   */
  public createOneToOneRelation(currentTable: string, gqlField: Field, tableName: string): void {
    let fieldname = `${currentTable}Id`
    if(gqlField.usesDirectives && gqlField.directives.OneToOne.field) {
      fieldname = gqlField.directives.OneToOne.field
    }
    if(!gqlField.isArray) {
      // tslint:disable-next-line: no-parameter-reassignment
      tableName = gqlField.type.toLowerCase()
      const hasColumn = this.dbConnection.schema.hasColumn(tableName, fieldname)
      if(hasColumn) {
        logger.info("skipping relation creation")
      } else {
        this.dbConnection.schema.alterTable(tableName, (table: Knex.TableBuilder) => {
          table.integer(fieldname).unique().unsigned()
          table.foreign(fieldname).references('id').inTable(currentTable)
        })
      }
    } else {
      throw new Error("Incorrext syntax declaration. Declaration should not be an array")
    }
  }

  /**
   * Create 1:m relation between tables
   * @param currentTable current table being parsed
   * @param gqlField properties of the field
   * @param tableName table to create relation in
   */
  public createOneToManyRelation(currentTable: string, gqlField: Field, tableName: string): void {
    let fieldname = `${currentTable}Id`
    if(gqlField.usesDirectives && gqlField.directives.OneToMany.field) {
      fieldname = gqlField.directives.OneToMany.field
    }
    if(gqlField.isArray) {
      // tslint:disable-next-line: no-parameter-reassignment
      tableName = gqlField.type.toLowerCase()
      const hasColumn = this.dbConnection.schema.hasColumn(tableName, fieldname)
      if(hasColumn) {
        logger.info("skipping relation creation")
      } else {
        this.dbConnection.schema.alterTable(tableName, (table: Knex.TableBuilder) => {
          table.integer(fieldname).unsigned()
          table.foreign(fieldname).references('id').inTable(currentTable)
        })
      }
    } else {
      throw new Error("Incorrect syntax declaration. Declaration should be an array.")
    }
  }

  /**
   * Create m:n relation between tables
   * @param currentTable current table being parsed
   * @param gqlField properties of the field
   */
  public createManyToManyRelation(currentTable: string, gqlField: Field): void {
    let newTable = gqlField.directives.ManyToMany.tablename
    if(!newTable) {
      newTable = `${currentTable}_${gqlField.type.toLowerCase()}`
    }
    const hasTable = this.dbConnection.schema.hasTable(newTable)
    if(gqlField.isArray) {
      if(hasTable) {
        logger.info("skipping relation creation")
      } else {
        const tableOne = gqlField.type.toLowerCase()
        const tableTwo = currentTable
        const fieldOne = `${tableOne}Id`
        const fieldTwo = `${currentTable}Id`
        this.dbConnection.schema.createTable(newTable, (table: Knex.TableBuilder) => {
          table.increments()
          table.integer(fieldOne).unsigned()
          table.foreign(fieldOne).references('id').inTable(tableOne)
          table.integer(fieldTwo).unsigned()
          table.foreign(fieldTwo).references('id').inTable(tableTwo)
          table.timestamps()
        })
      }
    } else {
      throw new Error("Incorrect syntax declaration. Declaration should be an array.")
    }
}

  public updateDatabaseResourcesFor(updates: IDataLayerUpdate[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public getConnection(): Knex {
    return this.dbConnection;
  }

}
