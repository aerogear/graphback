import { getModelMappingByName, GraphbackOperationType, mapDataFromTable, mapDataToTable, ModelTableMapping } from "@graphback/core"
import * as DataLoader from "dataloader";
import { PubSubEngine } from 'graphql-subscriptions';
import { GraphbackRuntimeContext } from '../api/GraphbackRuntimeContext';
import { GraphbackRuntimeOptions } from '../api/GraphbackRuntimeOptions';
import { GraphbackDataProvider } from "../data/GraphbackDataProvider";
import { defaultLogger, GraphbackMessageLogger } from '../utils/Logger';
import { upperCaseFirstChar } from '../utils/upperCaseFirstChar';
import { GraphbackCRUDService } from "./GraphbackCRUDService";
import { subscriptionTopicMapping } from './subscriptionTopicMapping';

/**
 * Default implementation of the CRUD service offering following capabilities:
 *
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
// tslint:disable-next-line: no-any
export class CRUDService<T = any> implements GraphbackCRUDService<T, GraphbackRuntimeContext | any>  {
    private db: GraphbackDataProvider;
    private logger: GraphbackMessageLogger;
    private modelTableMapping: ModelTableMapping[];
    private pubSub: PubSubEngine;

    constructor(db: GraphbackDataProvider, modelTableMapping: ModelTableMapping[], pubSub?: PubSubEngine,
        logger?: GraphbackMessageLogger) {
        this.db = db;
        this.pubSub = pubSub;
        this.modelTableMapping = modelTableMapping;
        this.logger = logger || defaultLogger;
    }

    public async create(name: string, data: T, options?: GraphbackRuntimeOptions, context?: GraphbackRuntimeContext): Promise<T> {
        this.logger.log(`Creating object ${name}`);

        const result = await this.db.create(name, data, context);

        if (this.pubSub && options && options && options.publishEvent) {
            const topic = subscriptionTopicMapping(GraphbackOperationType.CREATE, name);
            const payload = this.buildEventPayload('new', name, result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    public async update(name: string, id: string, data: T, options?: GraphbackRuntimeOptions, context?: GraphbackRuntimeContext): Promise<T> {
        this.logger.log(`Updating object ${name}`)

        const result = await this.db.update(name, id, data, context);

        if (this.pubSub && options && options.publishEvent) {
            const topic = subscriptionTopicMapping(GraphbackOperationType.UPDATE, name);
            const payload = this.buildEventPayload('updated', name, result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    // tslint:disable-next-line: no-reserved-keywords
    public async delete(name: string, id: string, data?: T, options?: GraphbackRuntimeOptions, context?: GraphbackRuntimeContext): Promise<string> {
        this.logger.log(`deleting object ${name}`)

        const result = await this.db.delete(name, id, data, context);

        if (this.pubSub && options && options.publishEvent) {
            const topic = subscriptionTopicMapping(GraphbackOperationType.DELETE, name);
            const payload = this.buildEventPayload('deleted', name, result);
            await this.pubSub.publish(topic, payload);
        }

        return result;
    }

    public read(name: string, id: string, options?: GraphbackRuntimeOptions, context?: GraphbackRuntimeContext): Promise<T> {
        this.logger.log(`reading object ${name}`)

        return this.db.read(name, id, context);
    }

    public findAll(name: string, options?: GraphbackRuntimeOptions, context?: GraphbackRuntimeContext): Promise<T[]> {
        this.logger.log(`querying object ${name}`)

        return this.db.findAll(name, context);
    }

    // tslint:disable-next-line: no-any
    public findBy(name: string, filter: any, options?: GraphbackRuntimeOptions, context?: GraphbackRuntimeContext): Promise<T[]> {
        this.logger.log(`querying object ${name} with filter ${JSON.stringify(filter)}`)

        return this.db.findBy(name, filter, context);
    }

    public subscribeToCreate(name: string, context?: GraphbackRuntimeContext): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${name}`)

            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const createSubKey = subscriptionTopicMapping(GraphbackOperationType.CREATE, name);

        return this.pubSub.asyncIterator(createSubKey)
    }

    public subscribeToUpdate(name: string, context?: GraphbackRuntimeContext): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${name}`)

            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const updateSubKey = subscriptionTopicMapping(GraphbackOperationType.UPDATE, name);

        return this.pubSub.asyncIterator(updateSubKey)
    }

    public subscribeToDelete(name: string, context?: GraphbackRuntimeContext): AsyncIterator<T> | undefined {
        if (!this.pubSub) {
            this.logger.log(`Cannot subscribe to events for ${name}`)

            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const deleteSubKey = subscriptionTopicMapping(GraphbackOperationType.DELETE, name);

        return this.pubSub.asyncIterator(deleteSubKey)
    }


    public batchLoadData(name: string, relationField: string, id: string | number, context: any) {
        const keyName = `${name}${upperCaseFirstChar(relationField)}DataLoader`;
        if (!context[keyName]) {
            context[keyName] = new DataLoader<string, any>((keys: string[]) => {
                return this.db.batchRead(name, relationField, keys);
            });
        }

        return context[keyName].load(id);
    }

    private buildEventPayload(action: string, name: string, result: string) {
        const payload = {};
        const capitalName = name[0].toUpperCase() +
            name.slice(1);
        payload[`${action}${capitalName}`] = result;

        return payload;
    }




}
