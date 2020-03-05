import yargs from 'yargs';
import { serve } from '../serveHandler';

type Params = { model?: string };

export const command = 'print-schema [options]';

export const desc = 'Generate and print GraphQL schema from data model files';

// tslint:disable-next-line: typedef
export const builder = (args: yargs.Argv) => {
  args.option('model', {
    describe: 'Directory to search for data models',
    type: 'string',
    alias: 'm'
  })
}

export async function handler(args: Params) {
  await serve(args, { schemaOnly: true });
}