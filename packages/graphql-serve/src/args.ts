#!/usr/bin/node
export const argv = require('yargs')
    .usage('Usage: $0 [options]')
    .options({
        model: { type: 'string' }
    })
    .describe('model', 'Specify the models directory')
    .example('$0 --model=modeldir', 'generate schema from models in the "modeldir" directory')
    .nargs('model', 1)
    .alias('model', 'm')
    .options({
        port: { type: 'number' }
    })
    .describe('port', 'Specify the port on which to listen on')
    .example('$0 --port=8000', 'server listens on port 8000')
    .nargs('port', 1)
    .alias('port', 'p')
    .options({
        schemaOnly: { type: 'boolean' }
    })
    .describe('schemaOnly', 'Only show GraphQL schema generated from data models')
    .example('$0 --schemaOnly', 'prints schema and quits')
    .help('h')
    .alias('h', 'help')
    .argv;