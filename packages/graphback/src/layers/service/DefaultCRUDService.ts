import { PubSub } from 'graphql-subscriptions';
import { defaultLogger, GraphbackMessageLogger } from '../../components/Logger';
import { ResolverType } from '../../generators/resolvers/ResolverType';
import { InputModelTypeContext } from '../../input/ContextTypes';
import { GraphbackDataProvider } from "../data/GraphbackDataProvider";
import { GraphbackCRUDService } from "./GraphbackCRUDService";
import { subscriptionTopicMapping } from './subscriptionTopicMapping';
/**
 * Default implementation of the CRUD service offering following capabilities:
 * 
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
// tslint:disable-next-line: no-any
export class DefaultsCRUDService<T = any, GraphbackContext = any>
    implements GraphbackCRUDService<T, GraphbackContext>  {

    private db: GraphbackDataProvider;
    private logger: GraphbackMessageLogger;
    private pubSub: PubSub;

    constructor(db: GraphbackDataProvider, pubSub?: PubSub,
        logger?: GraphbackMessageLogger) {
        this.db = db
        this.pubSub = pubSub;
        this.logger = logger || defaultLogger;
    }

    public async create(inputType: InputModelTypeContext, data: T, context: GraphbackContext): Promise<T> {
        this.logger.log(`Creating object ${inputType.name}`)
        const result = await this.db.create(inputType, data, context);
        if (this.pubSub && inputType.config.subCreate) {
            const topic = subscriptionTopicMapping(ResolverType.CREATE, inputType.name);
            const payload = this.buildEventPayload('new', inputType, result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }
    public async update(inputType: InputModelTypeContext, id: string, data: T, context: GraphbackContext): Promise<T> {
        this.logger.log(`Updating object ${inputType.name}`)

        const result = await this.db.update(inputType, id, data, context);
        if (this.pubSub && inputType.config.subUpdate) {
            const topic = subscriptionTopicMapping(ResolverType.UPDATE, inputType.name);
            const payload = this.buildEventPayload('updated', inputType, result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    // tslint:disable-next-line: no-reserved-keywords
    public async delete(inputType: InputModelTypeContext, id: string, context: GraphbackContext): Promise<string> {
        this.logger.log(`deleting object ${inputType.name}`)
        
        const result = await this.db.delete(inputType, id, context);
        if (this.pubSub && inputType.config.subDelete) {
            const topic = subscriptionTopicMapping(ResolverType.DELETE, name);
            const payload = this.buildEventPayload('deleted', inputType, result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    public read(inputType: InputModelTypeContext, id: string, context: GraphbackContext): Promise<T> {
        this.logger.log(`reading object ${inputType.name}`)

        return this.db.read(inputType, id, context);
    }

    public findAll(inputType: InputModelTypeContext, context: GraphbackContext): Promise<T[]> {
        this.logger.log(`querying object ${inputType.name}`)

        return this.db.findAll(inputType);
    }

    // tslint:disable-next-line: no-any
    public findBy(inputType: InputModelTypeContext, filter: any, context: GraphbackContext): Promise<T[]> {
        this.logger.log(`querying object ${inputType.name} with filter ${JSON.stringify(filter)}`)

        return this.db.findBy(inputType, filter, context);
    }

    public subscribeToCreate(inputType: InputModelTypeContext, context: GraphbackContext): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${inputType.name}`)

            return undefined;
        }
        const createSubKey = subscriptionTopicMapping(ResolverType.CREATE, inputType.name);

        return this.pubSub.asyncIterator(createSubKey)
    }

    public subscribeToUpdate(inputType: InputModelTypeContext, context: GraphbackContext): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${inputType.name}`)

            return undefined;
        }
        const updateSubKey = subscriptionTopicMapping(ResolverType.CREATE, inputType.name);

        return this.pubSub.asyncIterator(updateSubKey)
    }


    public subscribeToDelete(inputType: InputModelTypeContext, context: GraphbackContext): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${inputType.name}`)

            return undefined;
        }
        const deleteSubKey = subscriptionTopicMapping(ResolverType.CREATE, inputType.name);

        return this.pubSub.asyncIterator(deleteSubKey)
    }

    private buildEventPayload(action: string, inputType: InputModelTypeContext, result: string) {
        const payload = {};
        payload[`${action}${inputType.name}`] = result;

        return payload;
    }
}