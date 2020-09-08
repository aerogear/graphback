#!/usr/bin/env node

import * as yargs from 'yargs';

import { init } from './init/components';

type Params = {
  name?: string;
  templateName?: string;
  templateUrl?: string;
  filter?: string;
};

const command = '$0 <name>';

export const desc = 'Create Graphback project from available templates';

// tslint:disable-next-line: typedef
export const builder = (args: yargs.Argv) => {
  args.positional('name', {
    describe: 'Project name',
    type: 'string'
  });
  args.option('templateName', {
    describe: 'Name of the predefined template',
    type: 'string'
  });
  args.option('templateUrl', {
    describe:
      'GitHub URL of the template. For example (https://github.com/wtrocki/graphql-serve-example#master)',
    type: 'string'
  });
  args.option('filter', {
    describe:
      'A filter option used to limit the number of displayed templates that only matches it. For example "postgres" will only display templates that have a Postgres backed',
    type: 'string'
  });
};

export async function handler({
  name,
  templateName,
  templateUrl,
  filter
}: Params) {
  await init(name, templateName, templateUrl, filter);
}

if (require.main === module) {
  // eslint-disable-next-line no-unused-expressions
  yargs
    .command(command, desc, builder, handler)
    .example(
      '$0 my-awesome-project',
      'creates the "my-awesome-project" in the current working directory'
    )
    .demandCommand(1)
    .strict()
    .recommendCommands()
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version').argv;
}
