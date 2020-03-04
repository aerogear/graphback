#!/usr/bin/node
import { buildGraphbackServer } from "./GraphbackServer";
import { getGraphbackServerConfig } from "./GraphbackServerConfig";
import { argv } from "../src/args";

export const serve = async (): Promise<void> => {
    const graphbackConfigOpts = await getGraphbackServerConfig(argv.model);
    const server = await buildGraphbackServer(graphbackConfigOpts);
    console.log("Generated GraphQL Schema:\n\n")
    console.log(server.getSchema());
    if (!argv.schemaOnly){
        if (argv.port) {
            const portNumber = argv.port;
            if (isNaN(portNumber)) {
                console.log("\nSpecified port number is NaN, terminating...\n");
            } else {
                console.log("\nStarting server...\n");
                server.start(portNumber);
            }
        } else {
            console.log("\nNo port number specified.\nStarting server on random empty port...\n");
            server.start();
        }
    }
};
