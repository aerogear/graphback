#!/usr/bin/node
import { serve, printSchema } from "../src";
// eslint-disable-next-line no-unused-expressions
const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command({...serve, command: "* [options]"})
    .command(printSchema)
    .demandCommand(1, 'Please specify a command')
    .strict()
    .recommendCommands()
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version')
    .argv;