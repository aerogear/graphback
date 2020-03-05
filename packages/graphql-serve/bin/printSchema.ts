#!/usr/bin/env node

import { buildGraphbackServer, getGraphbackServerConfig } from "../src";
const argv = require('yargs')
    .usage('Usage: $0 [options]')
    .options({
        model: { type: 'string' }
    })
    .describe('model', 'Specify the models directory')
    .example('$0 --model=model', 'generate schema from models in the model directory')
    .nargs('model', 1)
    .alias('model', 'm')
    .help('h')
    .alias('h', 'help')
    .argv;

(async (): Promise<void> => {
    const graphbackConfigOpts = await getGraphbackServerConfig(argv.model);
    const server = await buildGraphbackServer(graphbackConfigOpts);
    console.log('generated schema: \n', server.getSchema());
})();
