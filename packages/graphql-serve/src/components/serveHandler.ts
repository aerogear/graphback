import { buildGraphbackServer } from "../GraphbackServer";
import { getGraphbackServerConfig } from "../GraphbackServerConfig";

export const serveHandler = async (argv: { model?: string, port?: number }): Promise<void> => {
    const graphbackServerConfig = await getGraphbackServerConfig({ modeldir: argv.model });
    const server = await buildGraphbackServer(graphbackServerConfig);
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
};
