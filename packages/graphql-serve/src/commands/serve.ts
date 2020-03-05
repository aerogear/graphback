import yargs from 'yargs';
import { serve } from '../serveHandler';

type Params = { model?: string, port?: number };

export const command = 'serve [options]';

export const desc = 'Generate and start GraphQL server from data model files';

// tslint:disable-next-line: typedef
export const builder = (args: yargs.Argv):void => {
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
  args.example('$0 serve -m . -p 8080', 'generate schema from data model files in current directory and start GraphQL server on port 8080')
}

export async function handler(args: Params): Promise<void> {
  await serve(args, { schemaOnly: false });
}