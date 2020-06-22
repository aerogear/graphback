import yargs from 'yargs';
import { cyan } from 'chalk';
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

export async function handler(args: Params): Promise<void> {
  const schemaSDL = await printSchemaHandler(args);

  console.log("Generated schema:\n");
  console.log(cyan(schemaSDL));
}
