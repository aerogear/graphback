import yargs from 'yargs';
import chalk from 'chalk';
import { printSchemaHandler } from '../components';

type Params = { model?: string };

export const command = 'print-schema [modelDir]';

export const desc = 'Generate and print GraphQL schema from data model files';

// tslint:disable-next-line: typedef
export const builder = (args: yargs.Argv): void => {
  args.positional('modelDir', {
    describe: 'Directory to search for data models',
    type: 'string',
    alias: 'model'
  })
  args.example('$0 print-schema modelDir', 'only display generated schema from data model files in modelDir directory and quit')
}

export function handler(args: Params): void {
  const schemaSDL = printSchemaHandler(args);

  console.log("Generated schema:\n");
  console.log(chalk.cyan(schemaSDL));
}
