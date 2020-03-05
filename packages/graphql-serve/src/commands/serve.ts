import yargs from 'yargs';
import { serve } from '../serveHandler';

type Params = { model?: string, port?: number };

export const command = 'serve [options]';

export const desc = 'Generate and start GraphQL server from data model files';

// tslint:disable-next-line: typedef
export const builder = (args: yargs.Argv) => {
  args.option('model', {
    describe: 'Directory to search for data models',
    type: 'string',
    alias: 'm'
  })
  args.option('port', {
    describe: 'Specify the port on which to listen on',
    type: 'number',
    alias: 'p'
  })
}

export async function handler(args: Params) {
  await serve(args, { schemaOnly: false });
}