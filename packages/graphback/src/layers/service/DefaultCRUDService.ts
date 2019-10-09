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

    public create(name: string, data: T, context: GraphbackContext): Promise<T> {
        this.logger.log(`Creating object ${name}`)

        return this.db.create(name, data, context);

    }
    public update(name: string, id: string, data: T, context: GraphbackContext): Promise<T> {
        this.logger.log(`Updating object ${name}`)

        return this.db.update(name, id, data, context);

    }

    // tslint:disable-next-line: no-reserved-keywords
    public delete(name: string, id: string, context: GraphbackContext): Promise<string> {
        this.logger.log(`deleting object ${name}`)

        return this.db.delete(name, id, context);
    }

    public read(name: string, id: string, context: GraphbackContext): Promise<T> {
        this.logger.log(`reading object ${name}`)

        return this.db.read(name, id, context);
    }

    public findAll(name: string, context: GraphbackContext): Promise<T[]> {
        this.logger.log(`querying object ${name}`)

        return this.db.findAll(name);
    }

    // tslint:disable-next-line: no-any
    public findBy(name: string, filter: any, context: GraphbackContext): Promise<T[]> {
        this.logger.log(`querying object ${name} with filter ${JSON.stringify(filter)}`)

        return this.db.findBy(name, filter, context);
    }
}