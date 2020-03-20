import { loadConfig } from 'graphql-config';
import Knex from 'knex'

export const getGraphbackConfig = async () => {
    const config = await loadConfig({
        extensions: [() => ({ name: 'graphback' })]
    });

    if (!config) {
        throw new Error("Can't load GraphQL Config");
    }

    const conf = await config.getDefault().extension('graphback');
    return conf;
}

export const getMigrateConfig = async () => {
    const config = await loadConfig({
        extensions: [() => ({ name: 'dbmigrations' })]
    });

    if (!config) {
        throw new Error("Can't load GraphQL Config");
    }

    const conf = await config.getDefault().extension('dbmigrations');
    return conf;
}

/**
 * Creates knex based database using migration configuration
 * For production use please use different source of the configuration
 */
export const createDB = async () => {

    const dbmigrations = await getMigrateConfig()

    // connect to db
    const db = Knex(dbmigrations)

    return db
}