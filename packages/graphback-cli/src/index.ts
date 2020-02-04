#!/usr/bin/env node

import * as yargs from 'yargs';

export * from './components'

if (require.main === module) {
  // tslint:disable-next-line: no-unused-expression
  yargs
    .commandDir('commands')
    .demandCommand(1)
    .strict()
    .recommendCommands()
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version')
    .argv;
}