import { GraphbackOperationType, InputModelTypeContext } from "@graphback/core"
import { PubSub } from 'graphql-subscriptions';
import { GraphbackDataProvider } from "../data/GraphbackDataProvider";
import { defaultLogger, GraphbackMessageLogger } from '../utils/Logger';
import { GraphbackCRUDService } from "./GraphbackCRUDService";
import { subscriptionTopicMapping } from './subscriptionTopicMapping';


interface GraphbackContext {
    publish: boolean
}

/**
 * Default implementation of the CRUD service offering following capabilities:
 *
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
// tslint:disable-next-line: no-any
export class DefaultCRUDService<T = any>
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

    public async create(name: string, data: T, context?: GraphbackContext): Promise<T> {
        this.logger.log(`Creating object ${name}`)
        const result = await this.db.create(name, data, context);
        if (this.pubSub && context.publish) {
            const topic = subscriptionTopicMapping(GraphbackOperationType.CREATE, name);
            const payload = this.buildEventPayload('new', name, result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }
    public async update(name: string, id: string, data: T, context?: GraphbackContext): Promise<T> {
        this.logger.log(`Updating object ${name}`)

        const result = await this.db.update(name, id, data, context);
        if (this.pubSub && context.publish) {
            const topic = subscriptionTopicMapping(GraphbackOperationType.UPDATE, name);
            const payload = this.buildEventPayload('updated', name, result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    // tslint:disable-next-line: no-reserved-keywords
    public async delete(name: string, id: string, context?: GraphbackContext): Promise<string> {
        this.logger.log(`deleting object ${name}`)

        const result = await this.db.delete(name, id, context);
        if (this.pubSub && context.publish) {
            const topic = subscriptionTopicMapping(GraphbackOperationType.DELETE, name);
            const payload = this.buildEventPayload('deleted', name, result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    public read(name: string, id: string, context?: GraphbackContext): Promise<T> {
        this.logger.log(`reading object ${name}`)

        return this.db.read(name, id, context);
    }

    public findAll(name: string, context?: GraphbackContext): Promise<T[]> {
        this.logger.log(`querying object ${name}`)

        return this.db.findAll(name, context);
    }

    // tslint:disable-next-line: no-any
    public findBy(name: string, filter: any, context?: GraphbackContext): Promise<T[]> {
        this.logger.log(`querying object ${name} with filter ${JSON.stringify(filter)}`)

        return this.db.findBy(name, filter, context);
    }

    public subscribeToCreate(name: string, context?: GraphbackContext): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${name}`)

            return undefined;
        }
        const createSubKey = subscriptionTopicMapping(GraphbackOperationType.CREATE, name);

        return this.pubSub.asyncIterator(createSubKey)
    }

    public subscribeToUpdate(name: string, context?: GraphbackContext): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${name}`)

            return undefined;
        }
        const updateSubKey = subscriptionTopicMapping(GraphbackOperationType.UPDATE, name);

        return this.pubSub.asyncIterator(updateSubKey)
    }

    public subscribeToDelete(name: string, context?: GraphbackContext): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${name}`)

            return undefined;
        }
        const deleteSubKey = subscriptionTopicMapping(GraphbackOperationType.DELETE, name);

        return this.pubSub.asyncIterator(deleteSubKey)
    }

    private buildEventPayload(action: string, name: string, result: string) {
        const payload = {};
        payload[`${action}${name}`] = result;

        return payload;
    }
}
