#!/usr/bin/node
const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .commandDir('../src/commands')
    .demandCommand(1, 'Please specify a command')
    .strict()
    .recommendCommands()
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version')
    .argv;