import { defaultLogger, GraphbackMessageLogger } from '../../components/Logger';
import { GraphbackDataProvider } from "../data/GraphbackDataProvider";
import { GraphbackCRUDService } from "./GraphbackCRUDService";

/**
 * Default implementation of the CRUD service offering following capabilities:
 * 
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
// tslint:disable-next-line: no-any
export class DefaultsCRUDService<T = any, GraphbackContext = any> implements GraphbackCRUDService {
    private db: GraphbackDataProvider;
    private logger: GraphbackMessageLogger;

    constructor(db: GraphbackDataProvider, logger?: GraphbackMessageLogger ) {
        this.db = db
        this.logger = logger || defaultLogger;
    }

    public createObject(name: string, data: T, context: GraphbackContext): Promise<T> {
        this.logger.log(`Creating object ${name}`)

        return this.db.createObject(name, data, context);

    }
    public updateObject(name: string, id: string, data: T, context: GraphbackContext): Promise<T> {
        this.logger.log(`Updating object ${name}`)

        return this.db.updateObject(name, id, data, context);

    }

    public deleteObject(name: string, id: string, context: GraphbackContext): Promise<string> {
        this.logger.log(`deleting object ${name}`)

        return this.db.deleteObject(name, id, context);
    }

    public readObject(name: string, id: string, context: GraphbackContext): Promise<T> {
        this.logger.log(`reading object ${name}`)

        return this.db.readObject(name, id, context);
    }

    public findAll(name: string, context: GraphbackContext): Promise<T[]> {
        this.logger.log(`querying object ${name}`)

        return this.db.findAll(name);
    }

    // tslint:disable-next-line: no-any
    public findBy(name: string, filter: any, context: GraphbackContext): Promise<T[]> {
        this.logger.log(`querying object ${name} with filter ${filter}`)

        return this.db.findBy(name, filter, context);
    }
}