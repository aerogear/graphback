import { InputModelTypeContext, graphQLInputContext, filterObjectTypes } from '@graphback/core';
import { diff } from '@graphql-inspector/core';
import { buildSchema } from 'graphql';
import { SchemaProvider, DatabaseChangeType, DatabaseChange, DatabaseStrategyOptions } from './database';
import { SchemaMigration } from './migrations/SchemaMigration';
import { mapModelChanges } from './utils/graphqlUtils';
import { ModelChange, ModelChangeType } from './changes/ChangeTypes';
import { GraphQLSchema } from 'graphql';
import { MigrationProvider } from './migrations/MigrationProvider';
import { KnexMigrationManager } from './migrations/KnexMigrationManager';

export class DatabaseMigrater {
  private schemaProvider: SchemaProvider;
  private knexMigrationManager: KnexMigrationManager;
  private migrationProvider: MigrationProvider;
  private inputContext: InputModelTypeContext[];
  constructor(options: DatabaseStrategyOptions) {
    this.schemaProvider = options.schemaProvider;
    this.migrationProvider = options.migrationProvider;
    const inputContext = graphQLInputContext.createModelContext(this.schemaProvider.getSchemaText(), {});
    this.inputContext = filterObjectTypes(inputContext);
    this.knexMigrationManager = new KnexMigrationManager(options.db);
  }

  public async init() {
    await this.knexMigrationManager.createMetadataTables();
    await this.createMigration();
    await this.applyMigrations();
    // TODO: Validate input
  }

  private async createMigration() {
    const newSchema = buildSchema(this.schemaProvider.getSchemaText());

    const migrations = await this.migrationProvider.getMigrations();

    let oldSchema: GraphQLSchema;
    if (migrations.length) {
      const last = migrations[migrations.length - 1];

      oldSchema = buildSchema(last.model);
    }

    const newMigration: SchemaMigration = {
      id: new Date().getTime().toString(),
      model: this.schemaProvider.getSchemaText()
    };

    let changes: ModelChange[] = [];
    if (oldSchema) {
      const inspectorChanges = diff(oldSchema, newSchema);
      changes = mapModelChanges(inspectorChanges);
    } else {
      changes = this.inputContext.map((model: InputModelTypeContext) => {
        return {
          type: ModelChangeType.TYPE_ADDED,
          path: {
            type: model.name
          }
        }
      });
    }

    if (!changes.length) {
      return;
    }

    newMigration.sql_up = this.getSqlStatements(changes).map((d: DatabaseChange) => d.sql).join('\n\n');
    newMigration.changes = JSON.stringify(changes);

    await this.migrationProvider.createMigration(newMigration);
  }

  private async applyMigrations() {
    const migrations = await this.migrationProvider.getMigrations();

    const migrationsToApply = migrations.filter((m: SchemaMigration) => !m.applied_at);

    const sorted = migrationsToApply.sort((a: SchemaMigration, b: SchemaMigration) => {
      return Number(a.id) - Number(b.id)
    });

    for (const migration of sorted) {
      await this.migrationProvider.applyMigration(migration);
    }
  }

  private groupChangesByModel(changes: ModelChange[]) {
    return changes.reduce((acc: ModelChange, current: ModelChange) => {

      if (!acc[current.path.type]) {
        acc[current.path.type] = [];
      }
      acc[current.path.type].push(current);

      return acc;
    }, {} as ModelChange);
  }

  private getSqlStatements(changes: ModelChange[]): DatabaseChange[] {
    const groupedChanges = this.groupChangesByModel(changes);
    const dirtyModels = this.inputContext.filter((t: InputModelTypeContext) => {
      return !!groupedChanges[t.name];
    });

    return dirtyModels.map((t: InputModelTypeContext) => {
      const ModelChangeTypes: ModelChange[] = groupedChanges[t.name];

      const typeAdded = ModelChangeTypes.find((c: ModelChange) => c.type === ModelChangeType.TYPE_ADDED);

      if (typeAdded) {
        return {
          type: DatabaseChangeType.createTable,
          sql: this.knexMigrationManager.addTable(t)
        }
      } else {
        return {
          type: DatabaseChangeType.alterTable,
          sql: this.knexMigrationManager.alterTable(t, ModelChangeTypes)
        }
      }
    });
  }
}
