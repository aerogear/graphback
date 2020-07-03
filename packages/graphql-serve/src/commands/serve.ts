import yargs from 'yargs';
import { serveHandler } from '../components/serveHandler';

type Params = { model?: string, port?: number, datasync: boolean };

export const command = 'serve [modelDir] [options]';

export const desc = 'Generate and start GraphQL server from data model files';

// tslint:disable-next-line: typedef
export const builder = (args: yargs.Argv): void => {
  args.positional('modelDir', {
    describe: 'Directory to search for data models',
    type: 'string',
    alias: 'model'
  })
  args.option('port', {
    describe: 'Specify the port on which to listen on',
    type: 'number',
    alias: 'p'
  })

  args.option('datasync', {
    describe: 'Enable data synchronization features',
    type: 'boolean',
    alias: 'ds'
  })
  args.example('$0 serve . -p 8080', 'generate schema from data model files in current directory and start GraphQL server on port 8080')
}

export async function handler(args: Params): Promise<void> {
  await serveHandler(args);
}
