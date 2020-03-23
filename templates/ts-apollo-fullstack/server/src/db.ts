import { loadConfig } from 'graphql-config';
import Knex from 'knex'

export const getConfig = async () => {
    const config = await loadConfig({
        extensions: [() => ({ name: 'dbmigrations' })]
    });

    if (!config) {
        throw new Error("Can't load GraphQL Config");
    }

    const dbConfig = await config.getDefault().extension('dbmigrations');

    return dbConfig;
}

/**
 * Creates knex based database using migration configuration
 * For production use please use different source of the configuration
 */
export const createDB = async () => {
    const dbmigrations = await getConfig();
    // connect to db
    const db = Knex(dbmigrations)

    return db as any
}