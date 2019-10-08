import { logger } from '../../components/Logger';
import { GraphbackDataProvider } from "../data/GraphbackDataProvider";
import { GraphbackCRUDService } from "./GraphbackCRUDService";

/**
 * TODO subscription support
 * TODO audit logging
 */
// tslint:disable-next-line: no-any
export class DefaultsCRUDService<T = any, GraphbackContext = any> implements GraphbackCRUDService {
    private db: GraphbackDataProvider;

    constructor(db: GraphbackDataProvider) {
        this.db = db;
    }

    public createObject(name: string, data: T, context: GraphbackContext): Promise<T> {
        logger(`creating object ${name}`)

        return this.db.createObject(name, data, context);

    }
    public updateObject(name: string, id: string, data: T, context: GraphbackContext): Promise<T> {
        logger(`updating object ${name}`)

        return this.db.updateObject(name, id, data, context);

    }

    public deleteObject(name: string, id: string, context: GraphbackContext): Promise<string> {
        logger(`deleting object ${name}`)

        return this.db.deleteObject(name, id, context);
    }

    public readObject(name: string, id: string, context: GraphbackContext): Promise<T> {
        logger(`reading object ${name}`)

        return this.db.readObject(name, id, context);
    }

    public findAll(name: string, context: GraphbackContext): Promise<T[]> {
        logger(`querying object ${name}`)

        return this.db.findAll(name);
    }

    // tslint:disable-next-line: no-any
    public findBy(name: string, filter: any, context: GraphbackContext): Promise<T[]> {
        logger(`querying object ${name} with filter ${filter}`)

        return this.db.findBy(name, filter, context);
    }
}