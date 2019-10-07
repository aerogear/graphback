import Knex = require('knex');
import { NoDataError } from './NoDataError';
import { GraphbackDataProvider, AdvancedFilter } from './GraphbackDataProvider';

/**
 * Knex.js database data provider exposing basic CRUD operations. 
 */
// tslint:disable-next-line: no-any
export class PgKnexDBDataProvider<T = any> implements GraphbackDataProvider<T>{
    private db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }

    public async createElement(name: string, data: T): Promise<T> {
        const dbResult = await this.db(name).insert(data).returning('*');
        if (dbResult && dbResult[0]) {
            return dbResult[0]
        }
        throw new NoDataError();
    }

    public async updateElement(name: string, id: string, data: T): Promise<T> {
        throw new Error("not implemented")
    }

    public async deleteElement(name: string, id: string, data: T): Promise<void> {
        throw new Error("not implemented")

    }

    public async readElement(name: string, id: string) {
        // TODO hardcoded id.
        const dbResult = await this.db.select().from(name).where('id', '=', id);
        if (dbResult && dbResult[0]) {
            return dbResult[0]
        }
        throw new NoDataError();
    }

    public async findAll(name: string): Promise<T[]> {
        const dbResult = await this.db.select().from(name);
        if (dbResult) {
            return dbResult;
        }
        throw new NoDataError();
    }

    public async findBy(name: string, filter: T | AdvancedFilter): Promise<T[]> {
        const dbResult = await this.db.select().from(name).where(filter);
        if (dbResult) {
            return dbResult;
        }
        throw new NoDataError();
    }

}