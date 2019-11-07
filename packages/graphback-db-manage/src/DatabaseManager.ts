import { InputModelTypeContext, graphQLInputContext } from '@graphback/core';
import { diff } from '@graphql-inspector/core';
import { buildSchema } from 'graphql';
import { SchemaProvider, DatabaseChangeType, DatabaseChange, DatabaseConnectionOptions } from './database';
import { MetadataProvider } from './MetadataProvider';
import { SchemaMigration } from './models';
import { printSchema } from 'graphql';
import { mapGraphbackChanges } from './utils/graphqlUtils';
import { GraphbackChange, GraphQLSchemaChangeTypes } from './changes/ChangeTypes';
import { KnexMigrationManager } from './migrations/KnexMigrationProvider';

export class DatabaseManager {
  private provider: SchemaProvider;
  private migrationProvider: KnexMigrationManager;
  private inputContext: InputModelTypeContext[];
  constructor(options: DatabaseConnectionOptions) {
    this.provider = options.schemaProvider;
    this.inputContext = graphQLInputContext.createModelContext(this.provider.getCurrentSchemaText(), {});
    this.migrationProvider = new KnexMigrationManager(options.client, options.connectionOptions);
  }

  public async init() {
    await this.migrationProvider.createMetadataTables();
    await this.saveMigration();

    // TODO: Validate input
  }

  private async saveMigration() {
    const newSchema = buildSchema(this.provider.getCurrentSchemaText());

    // tslint:disable-next-line: no-any
    let oldSchema: any;
    if (this.provider.getPreviousSchemaText()) {
      oldSchema = buildSchema(this.provider.getPreviousSchemaText());
    }

    const migrations = await this.migrationProvider.getMigrations();

    if (migrations.length) {
      const last = migrations[migrations.length - 1];

      oldSchema = buildSchema(last.model);
    }

    const newMigration: SchemaMigration = {
      model: printSchema(newSchema)
    };

    let changes: GraphbackChange[] = [];
    if (oldSchema) {
      const inspectorChanges = diff(oldSchema, newSchema);
      changes = mapGraphbackChanges(inspectorChanges);
      newMigration.changes = JSON.stringify(changes)

      if (changes.length) {
        newMigration.sql_up = this.getSqlStatements(changes).map((d: DatabaseChange) => d.sql).join('\n\n');
      }
    }

    if (changes.length || !migrations.length) {
      // await this.metadataProvider.createMigration(newMigration);
    }
  }

  private groupChangesByModel(changes: GraphbackChange[]) {
    return changes.reduce((acc: GraphbackChange, current: GraphbackChange) => {

      if (!acc[current.path.type]) {
        acc[current.path.type] = [];
      }
      acc[current.path.type].push(current);

      return acc;
    }, {} as GraphbackChange);
  }

  private getSqlStatements(changes: GraphbackChange[]): DatabaseChange[] {
    const groupedChanges = this.groupChangesByModel(changes);
    const dirtyModels = this.inputContext.filter((t: InputModelTypeContext) => {
      return !!groupedChanges[t.name];
    });

    return dirtyModels.map((t: InputModelTypeContext) => {
      const modelChanges: GraphbackChange[] = groupedChanges[t.name];

      const typeAdded = modelChanges.find((c: GraphbackChange) => c.type === GraphQLSchemaChangeTypes.TYPE_ADDED);

      if (typeAdded) {
        return {
          type: DatabaseChangeType.createTable,
          sql: this.migrationProvider.addTable(t)
        }
      } else {
        return {
          type: DatabaseChangeType.alterTable,
          sql: this.migrationProvider.alterTable(t, modelChanges)
        }
      }
    });
  }
}
