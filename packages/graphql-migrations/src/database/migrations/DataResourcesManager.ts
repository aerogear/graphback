// tslint:disable: await-promise
import { InputModelFieldContext, InputModelTypeContext, logger } from '@graphback/core';
import { Change, ChangeType } from '@graphql-inspector/core';
import { unlinkSync } from 'fs';
import { GlobSync } from 'glob';
import * as Knex from 'knex';
import { DatabaseContextProvider } from './DatabaseContextProvider';
/**
 * Represents update for data type
 */
export interface IDataLayerUpdate {
  oldType: InputModelTypeContext,
  newType: InputModelTypeContext
}

/**
 * Interface for creating database resources .
 * For example for relational databases implementors will execute DDL queries into database
 */
export interface IDataLayerResourcesManager {
  /**
   * Create resources for provided schema
   *
   * @param types that should be used to gather resources
   */
  createDatabaseResources(context: DatabaseContextProvider, types: InputModelTypeContext[]): Promise<void>;

  /**
   *  Create relations among tables in database.
   */
  createDatabaseRelations(context: DatabaseContextProvider, types: InputModelTypeContext[]): Promise<void>;

  /**
   * Update database resources after they are created
   *
   * @param updates to types
   */
  updateDatabaseResources(context: DatabaseContextProvider,
    types: InputModelTypeContext[], changes: Change[]): Promise<void>;
}

/**
 * Types of database Relations
 * 1-1, 1:m, m:n
 */
enum Relation {
  oneToOne = 'OneToOne',
  oneToMany = 'OneToMany',
  manyToMany = 'ManyToMany',
}

const createDBConnectionKnex = (
  client: string,
  dbConnectionOptions: Knex.ConnectionConfig | Knex.Sqlite3ConnectionConfig,
) => {
  switch (client) {
    case 'pg':
      return Knex({
        client: 'pg',
        connection: dbConnectionOptions,
      });
    case 'sqlite3':
      return Knex({
        client: 'sqlite3',
        connection: dbConnectionOptions,
      });
    default:
      return undefined;
  }
};

/**
 * Manager for Postgres database
 */
export class DatabaseSchemaManager implements IDataLayerResourcesManager {
  protected dbConnection: Knex;
  private client: string;

  // tslint:disable-next-line:typedef
  private primitiveTypesMapping = {
    String: 'string',
    Int: 'integer',
    Float: 'float',
    Boolean: 'boolean',
  };

  constructor(
    client: string,
    // tslint:disable-next-line: no-any
    db: Knex<any, unknown[]>
  ) {
    this.dbConnection = db;
    this.client = client;
  }

  public async createDatabaseResources(context: DatabaseContextProvider, types: InputModelTypeContext[]): Promise<void> {
    for (const gqlType of types) {
      const tableName: string = context.getFieldName(gqlType);

      await this.addTable(tableName, gqlType);
    }

    return Promise.resolve();
  }

  public async createDatabaseRelations(context: DatabaseContextProvider, types: InputModelTypeContext[]): Promise<void> {
    logger.info("Creating relations")
    for (const gqlType of types) {
      const tableName = context.getFieldName(gqlType);
      const currentTable = tableName;
      for (const gqlField of gqlType.fields) {
        if (gqlField.isType) {
          if (Relation.manyToMany in gqlField.directives) {
            await this.createManyToManyRelation(currentTable, gqlField);
          } else if (
            Relation.oneToMany in gqlField.directives ||
            gqlField.isArray
          ) {
            await this.createOneToManyRelation(
              currentTable,
              gqlField,
              tableName,
            );
          } else if (
            Relation.oneToOne in gqlField.directives ||
            !gqlField.isArray
          ) {
            await this.createOneToOneRelation(
              currentTable,
              gqlField,
              tableName,
            );
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
  public async createOneToOneRelation(currentTable: string, gqlField: InputModelFieldContext, tableName: string): Promise<void> {
    let fieldname = `${currentTable}Id`
    if (gqlField.hasDirectives && gqlField.directives.OneToOne.field) {
      fieldname = gqlField.directives.OneToOne.field;
    }
    if (!gqlField.isArray) {
      // tslint:disable-next-line: no-parameter-reassignment
      tableName = gqlField.type.toLowerCase();
      const hasColumn = await this.dbConnection.schema.hasColumn(
        tableName,
        fieldname,
      );
      if (hasColumn) {
        logger.info('skipping relation creation');
      } else {
        await this.dbConnection.schema.alterTable(
          tableName,
          (table: Knex.TableBuilder) => {
            table
              .integer(fieldname)
              .unique()
              .unsigned();
            table
              .foreign(fieldname)
              .references('id')
              .inTable(currentTable);
          },
        );
      }
    } else {
      throw new Error(
        'Incorrext syntax declaration. Declaration should not be an array',
      );
    }
  }

  /**
   * Create 1:m relation between tables
   * @param currentTable current table being parsed
   * @param gqlField properties of the field
   * @param tableName table to create relation in
   */
  public async createOneToManyRelation(currentTable: string, gqlField: InputModelFieldContext, tableName: string): Promise<void> {
    let fieldname = `${currentTable}Id`
    if (gqlField.hasDirectives && gqlField.directives.OneToMany.field) {
      fieldname = gqlField.directives.OneToMany.field;
    }
    if (gqlField.isArray) {
      // tslint:disable-next-line: no-parameter-reassignment
      tableName = gqlField.type.toLowerCase();
      // tslint:disable-next-line: await-promise
      const hasColumn = await this.dbConnection.schema.hasColumn(
        tableName,
        fieldname,
      );
      if (hasColumn) {
        logger.info('skipping relation creation');
      } else {
        await this.dbConnection.schema.alterTable(
          tableName,
          (table: Knex.TableBuilder) => {
            table.integer(fieldname).unsigned();
            table
              .foreign(fieldname)
              .references('id')
              .inTable(currentTable);
          },
        );
      }
    } else {
      throw new Error(
        'Incorrect syntax declaration. Declaration should be an array.',
      );
    }
  }

  /**
   * Create m:n relation between tables
   * @param currentTable current table being parsed
   * @param gqlField properties of the field
   */
  public async createManyToManyRelation(currentTable: string, gqlField: InputModelFieldContext): Promise<void> {
    let newTable = gqlField.directives.ManyToMany.tablename
    if (!newTable) {
      newTable = `${currentTable}_${gqlField.type.toLowerCase()}`;
    }

    // tslint:disable-next-line: await-promise
    const hasTable = await this.dbConnection.schema.hasTable(newTable);
    if (gqlField.isArray) {
      if (hasTable) {
        logger.info('skipping relation creation');
      } else {
        const tableOne = gqlField.type.toLowerCase();
        const tableTwo = currentTable;
        const fieldOne = `${tableOne}Id`;
        const fieldTwo = `${currentTable}Id`;
        await this.dbConnection.schema.createTable(
          newTable,
          (table: Knex.TableBuilder) => {
            table.increments();
            table.integer(fieldOne).unsigned();
            table
              .foreign(fieldOne)
              .references('id')
              .inTable(tableOne);
            table.integer(fieldTwo).unsigned();
            table
              .foreign(fieldTwo)
              .references('id')
              .inTable(tableTwo);
            table.timestamps();
          },
        );
      }
    } else {
      throw new Error(
        'Incorrect syntax declaration. Declaration should be an array.',
      );
    }
  }

  public async updateDatabaseResources(
    context: DatabaseContextProvider,
    types: InputModelTypeContext[],
    changes: Change[]
  ): Promise<void> {

    if (changes.length > 0) {
      logger.info(`Updating database schema`)

      for (const change of changes) {

        const parts = change.path.split('.');

        const changedType = {
          name: parts[0],
          field: parts[1],
        }

        const gqlType = types.find((t: InputModelTypeContext) => t.name === changedType.name);

        const tableName = context.getFieldName(gqlType);

        if (change.type === ChangeType.FieldAdded) {
          await this.addField(tableName, changedType.field, gqlType);
        }
        if (change.type === ChangeType.TypeAdded) {
          await this.addTable(tableName, gqlType);
        }
      }
    }
  }

  public getConnection(): Knex {
    return this.dbConnection;
  }

  public async dropDatabaseSchema() {
    try {
      if (this.client === 'sqlite3') {
        const sqliteFile = new GlobSync('*.sqlite', { cwd: process.cwd() })
        if (sqliteFile.found.length) {
          unlinkSync(`${process.cwd()}/${sqliteFile.found[0]}`)
        }
      } else {
        await this.getConnection().raw('DROP SCHEMA public CASCADE;')
        // tslint:disable-next-line: await-promise
        await this.getConnection().raw('CREATE SCHEMA public;')
      }

    } catch (err) {
      this.handleError(err)
    }
  }

  private async addField(tableName: string, field: string, t: InputModelTypeContext) {
    const hasTable = await this.dbConnection.schema.hasTable(tableName);

    const gqlField = t.fields.find((f: InputModelFieldContext) => f.name === field);

    if (!hasTable) {
      logger.info(`Table does not exist! Cannot add field to table ${tableName}`);
    } else {
      logger.info(`Adding field '${gqlField.name}' to table '${tableName}'`);

      await this.dbConnection.schema.alterTable(
        tableName,
        (table: Knex.TableBuilder) => {

          const method = this.primitiveTypesMapping[gqlField.type];
          if (method) {
            table[method](gqlField.name);
          }
        }
      );
    }
  }

  private async addTable(tableName: string, t: InputModelTypeContext) {
    const hasTable = await this.dbConnection.schema.hasTable(tableName);

    if (hasTable) {
      logger.info(`Table already exists! Cannot add table ${tableName}`);
    } else {
      logger.info(`Creating table ${tableName}`);

      await this.dbConnection.schema.createTable(
        tableName,
        (table: Knex.TableBuilder) => {
          table.increments();
          for (const field of t.fields) {
            const method = this.primitiveTypesMapping[field.type];
            if (method) {
              table[method](field.name);
            }
          }
          table.timestamps();
        },
      );
    }
  }

  // tslint:disable-next-line: no-any
  private handleError(err: any): void {
    if (err.code === 'ECONNREFUSED') {
      logger.warn('Database not running. Run docker-compose up -d or docker-compose start to start the database.')
    } else {
      logger.warn(err.message)
    }
    process.exit(0)
  }
}
