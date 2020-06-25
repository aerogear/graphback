import { buildGraphbackServer, GraphbackServer } from "../GraphbackServer";

export const serveHandler = async (argv: { model?: string, port?: number, datasync }): Promise<GraphbackServer> => {
  const server = await buildGraphbackServer(argv.model, !!argv.datasync);

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

  return server
};
