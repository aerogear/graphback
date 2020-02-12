
import { loadConfig } from 'graphql-config';
import knex from 'knex'

/**
 * Creates knex based database using migration configuration
 * For production use please use different source of the configuration
 */
export const createDB = async () => {
    const config = await loadConfig({
        extensions: [() => ({ name: 'graphback' })]
    });

    const generateConfig = await config!.getDefault().extension('graphback');

    // connect to db
    const db = knex(generateConfig.dbmigrations)
    return db
}
