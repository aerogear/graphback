// tslint:disable: await-promise
import * as Knex from 'knex'
import { Field, Type } from '../ContextTypes';
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

const createDBConnectionKnex = (client: string, dbConnectionOptions: Knex.ConnectionConfig | Knex.Sqlite3ConnectionConfig) => {
  switch (client) {
    case 'pg':
      return Knex({
        client: 'pg',
        connection: dbConnectionOptions
      })
    case 'sqlite3':
      return Knex({
        client: 'sqlite3',
        connection: dbConnectionOptions
      })
    default:
      return undefined;
  }
}

/**
 * Manager for Postgres database
 */
export class DatabaseSchemaManager implements IDataLayerResourcesManager {
  private dbConnection: Knex;

  // tslint:disable-next-line:typedef
  private primitiveTypesMapping = {
    String: 'string',
    Int: 'integer',
    Float: 'float',
    Boolean: 'boolean'
  }

  constructor(client: string, dbConnectionOptions: Knex.ConnectionConfig | Knex.Sqlite3ConnectionConfig) {
    this.dbConnection = createDBConnectionKnex(client, dbConnectionOptions)
  }

  public async createDatabaseResources(context: DatabaseContextProvider, types: Type[]): Promise<void> {
    for (const gqlType of types) {

      const tableName: string = context.getFieldName(gqlType)
      const hasTable = await this.dbConnection.schema.hasTable(tableName)
      if (hasTable) {
        logger.warn(`Table exists! Skipping table creation for ${tableName}`)
      } else {
        await this.dbConnection.schema.createTable(tableName, (table: Knex.TableBuilder) => {
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
        if (gqlField.isType) {
          if (Relation.manyToMany in gqlField.directives) {
            await this.createManyToManyRelation(currentTable, gqlField)
          }
          else if (Relation.oneToMany in gqlField.directives || gqlField.isArray) {
            await this.createOneToManyRelation(currentTable, gqlField, tableName)
          }
          else if (Relation.oneToOne in gqlField.directives || !gqlField.isArray) {
            await this.createOneToOneRelation(currentTable, gqlField, tableName)
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
  public async createOneToOneRelation(currentTable: string, gqlField: Field, tableName: string): Promise<void> {
    let fieldname = `${currentTable}Id`
    if (gqlField.hasDirectives && gqlField.directives.OneToOne.field) {
      fieldname = gqlField.directives.OneToOne.field
    }
    if (!gqlField.isArray) {
      // tslint:disable-next-line: no-parameter-reassignment
      tableName = gqlField.type.toLowerCase()
      const hasColumn = await this.dbConnection.schema.hasColumn(tableName, fieldname)
      if (hasColumn) {
        logger.info("skipping relation creation")
      } else {
        await this.dbConnection.schema.alterTable(tableName, (table: Knex.TableBuilder) => {
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
  public async createOneToManyRelation(currentTable: string, gqlField: Field, tableName: string): Promise<void> {
    let fieldname = `${currentTable}Id`
    if (gqlField.hasDirectives && gqlField.directives.OneToMany.field) {
      fieldname = gqlField.directives.OneToMany.field
    }
    if (gqlField.isArray) {
      // tslint:disable-next-line: no-parameter-reassignment
      tableName = gqlField.type.toLowerCase()
      // tslint:disable-next-line: await-promise
      const hasColumn = await this.dbConnection.schema.hasColumn(tableName, fieldname)
      if (hasColumn) {
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

  /**
   * Create m:n relation between tables
   * @param currentTable current table being parsed
   * @param gqlField properties of the field
   */
  public async createManyToManyRelation(currentTable: string, gqlField: Field): Promise<void> {
    let newTable = gqlField.directives.ManyToMany.tablename
    if (!newTable) {
      newTable = `${currentTable}_${gqlField.type.toLowerCase()}`
    }

    // tslint:disable-next-line: await-promise
    const hasTable = await this.dbConnection.schema.hasTable(newTable)
    if (gqlField.isArray) {
      if (hasTable) {
        logger.info("skipping relation creation")
      } else {
        const tableOne = gqlField.type.toLowerCase()
        const tableTwo = currentTable
        const fieldOne = `${tableOne}Id`
        const fieldTwo = `${currentTable}Id`
        await this.dbConnection.schema.createTable(newTable, (table: Knex.TableBuilder) => {
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
