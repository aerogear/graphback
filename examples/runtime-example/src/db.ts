import { loadConfig } from 'graphql-config';
import Knex from 'knex'

export const getConfig = async () => {
    const config = await loadConfig({
        extensions: [() => ({ name: 'graphback' })]
    });

    const conf = await config.getDefault().extension('graphback');

    return conf;
}

/**
 * Creates knex based database using migration configuration
 * For production use please use different source of the configuration
 */
export const createDB = async () => {
    const generateConfig = await getConfig();
    // connect to db
    const db = Knex(generateConfig.dbmigrations)

    return db
}