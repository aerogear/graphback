// tslint:disable-next-line: no-require-imports
import * as Knex from 'knex';
import { AdvancedFilter, GraphbackDataProvider } from './GraphbackDataProvider';
import { NoDataError } from './NoDataError';
 
/**
 * Knex.js database data provider exposing basic CRUD operations. 
 */
// tslint:disable-next-line: no-any
export class PgKnexDBDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{

    private db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }

    public async createObject(name: string, data: Type): Promise<Type> {
        const dbResult = await this.db(name).insert(data).returning('*');
        if (dbResult && dbResult[0]) {
            return dbResult[0]
        }
        throw new NoDataError(`Cannot create ${name}`);
    }

    public async updateObject(name: string, id: string, data: Type): Promise<Type> {
        const dbResult = await this.db(name).update(data).returning('*');
        if (dbResult && dbResult[0]) {
            return dbResult[0]
        }
        throw new NoDataError(`Cannot update ${name}`);
    }

    public async deleteObject(name: string, id: string): Promise<string> {
        const dbResult = await this.db(name).where('id', '=', id).del()
        if (dbResult) {
            return id;
        }
        throw new NoDataError(`Cannot delete ${name}`);

    }

    public async readObject(name: string, id: string): Promise<Type> {
        // TODO hardcoded id.
        const dbResult = await this.db.select().from(name).where('id', '=', id);
        if (dbResult && dbResult[0]) {
            return dbResult[0]
        }
        throw new NoDataError(`Cannot read ${name}`);
    }

    public async findAll(name: string): Promise<Type[]> {
        const dbResult = await this.db.select().from(name);
        if (dbResult) {
            return dbResult;
        }
        throw new NoDataError(`Cannot find all results for ${name}`);
    }

    public async findBy(name: string, filter: Type | AdvancedFilter): Promise<Type[]> {
        const dbResult = await this.db.select().from(name).where(filter);
        if (dbResult) {
            return dbResult;
        }
        throw new NoDataError(`No results for ${name} and filter: ${JSON.stringify(filter)}`);
    }

}