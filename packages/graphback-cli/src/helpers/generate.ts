import chalk from 'chalk';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob'
import { GraphbackEngine } from 'graphback'
import { buildSchema, GraphQLSchema } from 'graphql';
import { join } from 'path'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { logError, logInfo } from '../utils';
import { checkDirectory } from './common';
import { loadSchema } from './loadSchema';

/**
 * Message after command execution
 */
function postCommandMessage(cliName: string): void {
  logInfo(`
Successfully generated schema and resolvers :tada:.

Run ${chalk.cyan(`docker-compose up -d`)} or ${chalk.cyan(`docker-compose start`)}
followed by ${chalk.cyan(`${cliName}db`)} to create database.

After changing your data model, run ${chalk.cyan(`graphback update-db`)} to update the database.
`)
}

/**
 * Generate schema and resolvers using graphback-core and
 * write them into generated folder
 */
export async function generateBackend(): Promise<void> {
  try {
    const configInstance = new ConfigBuilder();
    checkDirectory(configInstance)
    const { folders, graphqlCRUD, client } = configInstance.config;

    const models = new GlobSync(`${folders.model}/*.graphql`)

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${folders.model} folder.`)
      process.exit(0)
    }

    const schemaText = loadSchema(folders.model);
    const schema: GraphQLSchema = buildSchema(schemaText);
    // TODO COnfig should be moved to GraphQL-Config
    const engine = new GraphbackEngine(schema, {
      global: {
        crudMethods: graphqlCRUD
      },
      plugins: {
        SchemaCRUD: {
          format: 'ts',
        },
        ResolversCRUD: {
          format: 'ts',
          outputPath: folders.resolvers,
          types: undefined
        },
        ClientCRUD: {
          format: "ts",
          outputPath: folders.client,
        }
      }
    })
    const generatedSchemaString = engine.buildServer();

    // TODO this should be part of the core
    const outputSchemaPath: string = join(folders.schema, 'generated.ts')
    writeFileSync(outputSchemaPath, generatedSchemaString)
  } catch (err) {
    logError(err)
    process.exit(0)
  }


}

/**
 * exported generate handler
 */
export async function generate(cliName: string = "graphback"): Promise<void> {
  await generateBackend()
  postCommandMessage(cliName)
}
