#!/usr/bin/node
import { GraphbackServer, buildGraphbackServer, getGraphbackConfig } from "../src";

async function main () {
    const graphbackConfigOpts = await getGraphbackConfig();
    const server = await buildGraphbackServer(graphbackConfigOpts);
    console.log('schema: ', server.getSchema);
    server.start();
}

main().catch(e => {throw e});