import { GraphbackOperationType, ModelTableMap, upperCaseFirstChar } from "@graphback/core"
import * as DataLoader from "dataloader";
import { GraphQLObjectType } from 'graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { GraphbackDataProvider } from "../data/GraphbackDataProvider";
import { defaultLogger, GraphbackMessageLogger } from '../utils/Logger';
import { GraphbackPage } from "../GraphbackPage"
import { GraphbackCRUDService } from "./GraphbackCRUDService";
import { GraphbackPubSub } from "./GraphbackPubSub"

/**
 * Default implementation of the CRUD service offering following capabilities:
 *
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
//tslint:disable-next-line: no-any
export class CRUDService<T = any> implements GraphbackCRUDService<T>  {
    private db: GraphbackDataProvider;
    private logger: GraphbackMessageLogger;
    private pubSub: PubSubEngine;
    private publishConfig: GraphbackPubSub;
    private modelName: string;

    public constructor(modelType: GraphQLObjectType, db: GraphbackDataProvider, subscriptionConfig: GraphbackPubSub, logger?: GraphbackMessageLogger) {
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
            const topic = this.subscriptionTopicMapping(GraphbackOperationType.CREATE, this.modelName);
            //TODO use subscription name mapping
            const payload = this.buildEventPayload('new', result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    public async update(data: T, context?: any): Promise<T> {
        this.logger.log(`Updating object ${this.modelName}`)

        const result = await this.db.update(data, context);

        if (this.pubSub && this.publishConfig.publishUpdate) {
            const topic = this.subscriptionTopicMapping(GraphbackOperationType.UPDATE, this.modelName);
            //TODO use subscription name mapping
            const payload = this.buildEventPayload('updated', result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    //tslint:disable-next-line: no-reserved-keywords
    public async delete(data: T, context?: any): Promise<T> {
        this.logger.log(`deleting object ${this.modelName}`)

        const result = await this.db.delete(data, context);

        if (this.pubSub && this.publishConfig.publishUpdate) {
            const topic = this.subscriptionTopicMapping(GraphbackOperationType.DELETE, this.modelName);
            const payload = this.buildEventPayload('deleted', result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    public findAll(page?: GraphbackPage, context?: any): Promise<T[]> {
        this.logger.log(`querying object ${this.modelName}`)

        return this.db.findAll(page, context);
    }

    //tslint:disable-next-line: no-any
    public findBy(filter: any, page?: GraphbackPage, context?: any): Promise<T[]> {
        this.logger.log(`querying object ${this.modelName} with filter ${JSON.stringify(filter)}`)

        return this.db.findBy(filter, page, context);
    }

    public subscribeToCreate(filter: any, context?: any): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${this.modelName}`)

            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const createSubKey = this.subscriptionTopicMapping(GraphbackOperationType.CREATE, this.modelName);

        return this.pubSub.asyncIterator(createSubKey)
    }

    public subscribeToUpdate(filter: any, context?: any): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${this.modelName}`)

            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const updateSubKey = this.subscriptionTopicMapping(GraphbackOperationType.UPDATE, this.modelName);

        return this.pubSub.asyncIterator(updateSubKey)
    }

    public subscribeToDelete(filter: any, context?: any): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${this.modelName}`)

            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const deleteSubKey = this.subscriptionTopicMapping(GraphbackOperationType.DELETE, this.modelName);

        return this.pubSub.asyncIterator(deleteSubKey)
    }


    public batchLoadData(relationField: string, id: string | number, context?: any) {
        //TODO use relationfield mapping
        const keyName = `${this.modelName}${upperCaseFirstChar(relationField)}DataLoader`;
        if (!context[keyName]) {
            context[keyName] = new DataLoader<string, any>((keys: string[]) => {
                return this.db.batchRead(relationField, keys);
            });
        }

        return context[keyName].load(id);
    }


    /**
     * Provides way to map runtime topics for subscriptions for specific types and object names
     */
    protected subscriptionTopicMapping(triggerType: GraphbackOperationType, objectName: string) {
        return `${triggerType}_${objectName}`.toUpperCase();
    }

    private buildEventPayload(action: string, result: any) {
        const payload = {};
        payload[`${action}${this.modelName}`] = result;

        return payload;
    }
}
