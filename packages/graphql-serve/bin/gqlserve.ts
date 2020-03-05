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
    .example('$0 -m . -p 8080', 'generate schema from data model files in current directory and start GraphQL server on port 8080')
    .example('$0 print-schema --model=modelDir', 'only display generated schema from data model files in modelDir directory and quit')
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version')
    .argv;