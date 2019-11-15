import { filterObjectTypes, graphQLInputContext, InputModelTypeContext } from '@graphback/core';
import { diff } from '@graphql-inspector/core';
import { buildSchema, GraphQLSchema } from 'graphql';
import { ModelChange, ModelChangeType } from './changes/ChangeTypes';
import { DatabaseChange, DatabaseChangeType, DatabaseStrategyOptions, SchemaProvider } from './database';
import { KnexMigrationManager } from './migrations/KnexMigrationManager';
import { MigrationProvider } from './migrations/MigrationProvider';
import { SchemaMigration } from './migrations/SchemaMigration';
import { mapModelChanges } from './utils/graphqlUtils';

/**
 * Manages schema migration.
 *
 * - Create migration tables
 * - Generate migrations
 * - Apply migrations
 *
 * @export
 * @class DatabaseMigrater
 */
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

  /**
   * Initialize the schema migration process.
   *
   * @memberof DatabaseMigrater
   */
  public async init() {
    await this.knexMigrationManager.createMetadataTables();
    await this.createMigration();
    await this.applyMigrations();
    // TODO: Validate input
  }

  /**
   * Collect migration metadata and create it
   *
   * @private
   * @returns
   * @memberof DatabaseMigrater
   */
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

  /**
   * Get the migrations that have not been applied and apply them
   *
   * @private
   * @memberof DatabaseMigrater
   */
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

  /**
   * Group all chage types by their model
   *
   * @private
   * @param {ModelChange[]} changes
   * @returns
   * @memberof DatabaseMigrater
   */
  private groupChangesByModel(changes: ModelChange[]) {
    return changes.reduce((acc: ModelChange, current: ModelChange) => {

      if (!acc[current.path.type]) {
        acc[current.path.type] = [];
      }
      acc[current.path.type].push(current);

      return acc;
    // tslint:disable-next-line: no-object-literal-type-assertion
    }, {} as ModelChange);
  }

  /**
   * Generate CREATE and ALTER SQL statements
   *
   * @private
   * @param {ModelChange[]} changes
   * @returns {DatabaseChange[]}
   * @memberof DatabaseMigrater
   */
  private getSqlStatements(changes: ModelChange[]): DatabaseChange[] {
    const groupedChanges = this.groupChangesByModel(changes);
    const dirtyModels = this.inputContext.filter((t: InputModelTypeContext) => {
      return !!groupedChanges[t.name];
    });

    return dirtyModels.map((t: InputModelTypeContext) => {
      const modelChangeTypes: ModelChange[] = groupedChanges[t.name];

      const typeAdded = modelChangeTypes.find((c: ModelChange) => c.type === ModelChangeType.TYPE_ADDED);

      if (typeAdded) {
        return {
          type: DatabaseChangeType.createTable,
          sql: this.knexMigrationManager.addTable(t)
        }
      } else {
        return {
          type: DatabaseChangeType.alterTable,
          sql: this.knexMigrationManager.alterTable(t, modelChangeTypes)
        }
      }
    });
  }
}
