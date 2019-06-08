#!/usr/bin/env node

import * as yargs from 'yargs';

// tslint:disable-next-line: no-unused-expression
yargs
  .commandDir('commands')
  .demandCommand(1)
  .help()
  .version()
  .argv;