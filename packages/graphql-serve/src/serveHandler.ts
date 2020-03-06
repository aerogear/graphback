import { buildGraphbackServer } from "./GraphbackServer";
import { getGraphbackServerConfig } from "./GraphbackServerConfig";
import Knex = require('knex');

const dbmigrationsConfig = {
    client: "sqlite3",
    connection: {
        filename: ":memory:"
    },
    debug: true,
    useNullAsDefault: true
};

export const serve = async (argv: { model?: string, port?: number }, options: { schemaOnly: boolean } = { schemaOnly: false }): Promise<void> => {
    const graphbackConfigOpts = await getGraphbackServerConfig(argv.model);
    const db = Knex(dbmigrationsConfig);
    const server = await buildGraphbackServer(graphbackConfigOpts, db);
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
