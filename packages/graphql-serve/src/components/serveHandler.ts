import { buildGraphbackServer } from "../GraphbackServer";
import { ConflictResolutionStrategyName, DataSyncServeConfig } from "../runtime";

export type GraphQLServeParams = { model?: string, port?: number, datasync: boolean, conflict?: ConflictResolutionStrategyName, deltaTTL?: number };

export const serveHandler = async (argv: GraphQLServeParams): Promise<void> => {
  const datasyncServeConfig: DataSyncServeConfig = { datasync: !!argv.datasync, conflict: argv.conflict, deltaTTL: argv.deltaTTL}
  const server = await buildGraphbackServer(argv.model, datasyncServeConfig);

  if ('port' in argv) {
    const portNumber = argv.port;
    if (isNaN(portNumber)) {
      console.log("\nSpecified port number is NaN, terminating...\n");
    } else {
      console.log("\nStarting server...\n");
      await server.start(portNumber);
    }
  } else {
    console.log("\nNo port number specified.\nStarting server on random available port...\n");
    await server.start();
  }
};
