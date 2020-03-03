import { loadConfig } from 'graphql-config';
import Knex from 'knex'


export const getGraphbackConfig = async (rootdir?: string) => {
    const configLoaderOpts: any = {
        extensions: [() => ({ name: 'graphback' })]
    }
    if (rootdir) configLoaderOpts.rootdir = rootdir;
    const config = await loadConfig(configLoaderOpts);

    const conf = await config.getDefault().extension('graphback');
    return conf;
}

export const migrateConfig = {
    client: "sqlite3",
    connection: {
        filename: "file:memDb1?mode=memory&cache=shared"
        // filename: ":memory:"
    }
};

/**
 * Creates knex based database using migration configuration
 * For production use please use different source of the configuration
 */
export const createDB = () => {

    const dbmigrations = migrateConfig;

    // connect to db
    const db = Knex(dbmigrations)

    return db
}