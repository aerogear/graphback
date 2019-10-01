#!/usr/bin/env node

import * as yargs from 'yargs';

export * from './helpers'

if (require.main === module) {
  // tslint:disable-next-line: no-unused-expression
  yargs
    .commandDir('commands')
    .demandCommand(1)
    .strict()
    .help()
    .alias('h', 'help')
    .version()
    .argv;
}