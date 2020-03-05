#!/usr/bin/env node

import * as yargs from 'yargs';
import { serve, printSchema } from 'graphql-serve';

export * from './components'
export * from './config/dbmigrationsExtension'
export * from './config/graphbackExtension'

if (require.main === module) {
  // eslint-disable-next-line no-unused-expressions
  yargs
    .commandDir('commands')
    .command(serve)
    .command(printSchema)
    .demandCommand(1)
    .strict()
    .recommendCommands()
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version')
    .argv;
}