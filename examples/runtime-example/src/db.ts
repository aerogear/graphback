
import { loadConfig } from 'graphql-config';
import knex from 'knex'

/**
 * Creates knex based database using migration configuration
 */
export const createDB = async () => {
    const generateConfig = await getConfig();
    // connect to db
    const db = knex({
        client: generateConfig.dbmigrations.database,
        connection: generateConfig.dbmigrations.dbConfig,
    })
    return db
}

export const getConfig = async () => {
    const config = await loadConfig({
        extensions: [() => ({ name: 'graphback' })]
    });

    return await config!.getDefault().extension('graphback');
}