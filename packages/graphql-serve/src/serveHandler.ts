import { buildGraphbackServer } from "./GraphbackServer";
import { getGraphbackServerConfig } from "./GraphbackServerConfig";

export const serve = async (argv: { model?: string, port?: number }, options: { schemaOnly: boolean } = { schemaOnly: false }): Promise<void> => {
    const graphbackServerConfig = await getGraphbackServerConfig({ modeldir: argv.model });
    const server = await buildGraphbackServer(graphbackServerConfig);
    console.log("Generated GraphQL Schema:\n")
    console.log(server.getSchema());
    if (!options.schemaOnly) {
        if ('port' in argv) {
            const portNumber = argv.port;
            if (isNaN(portNumber)) {
                console.log("\nSpecified port number is NaN, terminating...\n");
            } else {
                console.log("\nStarting server...\n");
                server.start(portNumber);
            }
        } else {
            console.log("\nNo port number specified.\nStarting server on random available port...\n");
            server.start();
        }
    }
};
