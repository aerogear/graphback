#!/usr/bin/node
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
    .options({
        port: { type: 'number' }
    })
    .describe('port', 'Specify the port on which to listen on')
    .example('$0 --port=8000', 'server listens on port 8000')
    .nargs('port', 1)
    .alias('port', 'p')
    .help('h')
    .alias('h', 'help')
    .argv;

const main = async (): Promise<void> => {
    const graphbackConfigOpts = await getGraphbackServerConfig(argv.model);
    const server = await buildGraphbackServer(graphbackConfigOpts);
    console.log('generated schema: \n', server.getSchema());
    if (isNaN(argv.port)) {
        console.log("Port not specified, choosing random empty port.");
        server.start();
    } else {
        server.start(argv.port);
    }
};

main().catch(e => {throw e});