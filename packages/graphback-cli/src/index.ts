#!/usr/bin/env node

import * as yargs from 'yargs';

if (require.main === module) {
  // tslint:disable-next-line: no-unused-expression
  yargs
    .commandDir('commands')
    .demandCommand(1)
    .help()
    .version()
    .argv;
}

export * from './helpers'