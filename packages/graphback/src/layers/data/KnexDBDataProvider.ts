// tslint:disable-next-line: no-require-imports
import * as Knex from 'knex';
import { AdvancedFilter, GraphbackDataProvider } from './GraphbackDataProvider';
import { NoDataError } from './NoDataError';

/**
 * Knex.js database data provider exposing basic CRUD operations that works with all databases that knex supports.
 * Layer is tested with following databases:
 * 
 * - Sqlite
 * - MySQL (MariaDB)
 * - Postgress (by `PgKnexDBDataProvider`)
 * 
 * NOTE: For Postgres use dedicated `PgKnexDBDataProvider` that implements more performant creation method.
 */
// tslint:disable-next-line: no-any
export class KnexDBDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{

    protected db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }

    public async create(name: string, data: Type): Promise<Type> {
        const id = await this.db(name).insert(data).returning('id');
        const dbResult = await this.db.select().from(name).where('id', '=', id)
        if (dbResult && dbResult[0]) {
            return dbResult[0]
        }
        throw new NoDataError(`Cannot create ${name}`);
    }

    public async update(name: string, id: string, data: Type): Promise<Type> {
        const dbResult = await this.db(name).update(data).returning('*');
        if (dbResult && dbResult[0]) {
            return dbResult[0]
        }
        throw new NoDataError(`Cannot update ${name}`);
    }

    // tslint:disable-next-line: no-reserved-keywords
    public async delete(name: string, id: string): Promise<string> {
        const dbResult = await this.db(name).where('id', '=', id).del()
        if (dbResult) {
            return id;
        }
        throw new NoDataError(`Cannot delete ${name}`);

    }

    public async read(name: string, id: string): Promise<Type> {
        // FIXME we use hardcoded id that needs to be reflected in migration. 
        // To do that properl we can introduce @ID directive when performing data migration
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
        throw new NoDataError(`No results for ${name} query and filter: ${JSON.stringify(filter)}`);
    }

    public async batchRead(name: string, ids: string[]): Promise<Type[]> {
        const dbResult = await this.db.select().from(name).where('id', 'in', ids);
        if (dbResult) {
            return dbResult;
        }
        throw new NoDataError(`No results for ${name} and id: ${JSON.stringify(ids)}`);
    }

}