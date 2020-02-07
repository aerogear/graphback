import { GraphbackOperationType, upperCaseFirstChar } from "@graphback/core"
import DataLoader from "dataloader";
import { GraphQLObjectType } from 'graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { GraphbackDataProvider } from "../data/GraphbackDataProvider";
import { defaultLogger, GraphbackMessageLogger } from '../utils/Logger';
import { GraphbackCRUDService } from "./GraphbackCRUDService";
import { PubSubConfig } from "./PubSubConfig"
import { subscriptionTopicMapping } from './subscriptionTopicMapping';

/**
 * Default implementation of the CRUD service offering following capabilities:
 *
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
// tslint:disable-next-line: no-any
export class CRUDService<T = any> implements GraphbackCRUDService<T>  {
    private db: GraphbackDataProvider;
    private logger: GraphbackMessageLogger;
    private pubSub: PubSubEngine;
    private publishConfig: PubSubConfig;
    private modelName: string;

    constructor(modelType: GraphQLObjectType, db: GraphbackDataProvider, subscriptionConfig: PubSubConfig, logger?: GraphbackMessageLogger) {
        this.db = db;
        this.pubSub = subscriptionConfig.pubSub;
        this.logger = logger || defaultLogger;
        this.publishConfig = subscriptionConfig;
        this.modelName = modelType.name;
    }

    public async create(data: T, context?: any): Promise<T> {
        this.logger.log(`Creating object ${this.modelName}`);

        const result = await this.db.create(data, context);

        if (this.pubSub && this.publishConfig.publishCreate) {
            const topic = subscriptionTopicMapping(GraphbackOperationType.CREATE, this.modelName);
            // TODO use subscription name mapping 
            const payload = this.buildEventPayload('new', result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    public async update(data: T, context?: any): Promise<T> {
        this.logger.log(`Updating object ${this.modelName}`)

        const result = await this.db.update(data, context);

        if (this.pubSub && this.publishConfig.publishUpdate) {
            const topic = subscriptionTopicMapping(GraphbackOperationType.UPDATE, this.modelName);
            // TODO use subscription name mapping 
            const payload = this.buildEventPayload('updated', result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    // tslint:disable-next-line: no-reserved-keywords
    public async delete(data: T, context?: any): Promise<T> {
        this.logger.log(`deleting object ${this.modelName}`)

        const result = await this.db.delete(data, context);

        if (this.pubSub && this.publishConfig.publishUpdate) {
            const topic = subscriptionTopicMapping(GraphbackOperationType.DELETE, this.modelName);
            const payload = this.buildEventPayload('deleted', result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    public read(id: string, context?: any): Promise<T> {
        this.logger.log(`reading object ${this.modelName}`)

        // TODO use mapping
        return this.db.read(id, context);
    }

    public findAll(context?: any): Promise<T[]> {
        this.logger.log(`querying object ${this.modelName}`)

        return this.db.findAll(context);
    }

    // tslint:disable-next-line: no-any
    public findBy(filter: any, context?: any): Promise<T[]> {
        this.logger.log(`querying object ${this.modelName} with filter ${JSON.stringify(filter)}`)

        return this.db.findBy(filter, context);
    }

    public subscribeToCreate(filter: any, context?: any): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${this.modelName}`)

            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const createSubKey = subscriptionTopicMapping(GraphbackOperationType.CREATE, this.modelName);

        return this.pubSub.asyncIterator(createSubKey)
    }

    public subscribeToUpdate(filter: any, context?: any): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${this.modelName}`)

            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const updateSubKey = subscriptionTopicMapping(GraphbackOperationType.UPDATE, this.modelName);

        return this.pubSub.asyncIterator(updateSubKey)
    }

    public subscribeToDelete(filter: any, context?: any): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${this.modelName}`)

            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const deleteSubKey = subscriptionTopicMapping(GraphbackOperationType.DELETE, this.modelName);

        return this.pubSub.asyncIterator(deleteSubKey)
    }


    public batchLoadData(relationField: string, id: string | number, context?: any) {
        // TODO use relationfield mapping
        const keyName = `${this.modelName}${upperCaseFirstChar(relationField)}DataLoader`;
        if (!context[keyName]) {
            context[keyName] = new DataLoader<string, any>((keys: string[]) => {
                return this.db.batchRead(relationField, keys);
            });
        }

        return context[keyName].load(id);
    }

    private buildEventPayload(action: string, result: any) {
        const payload = {};
        payload[`${action}${this.modelName}`] = result;

        return payload;
    }
}
