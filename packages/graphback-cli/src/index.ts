#!/usr/bin/env node

import * as yargs from 'yargs';

export * from './components';

export * from './commands/generate';

if (require.main === module) {
  // eslint-disable-next-line no-unused-expressions
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
