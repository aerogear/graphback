import * as DataLoader from "dataloader";
import { PubSubEngine } from 'graphql-subscriptions';
import { GraphbackCRUDGeneratorConfig, GraphbackOperationType, upperCaseFirstChar, getSubscriptionName } from '..';
import { withSubscriptionFilter } from './withSubscriptionFilter';
import { GraphbackCRUDService, GraphbackDataProvider, GraphbackContext, GraphbackOrderBy, GraphbackPage, ResultList, QueryFilter } from '.';

/**
 * Configurations necessary to create a CRUDService
 */
export interface CRUDServiceConfig {
  /**
   * PubSub implementation for creating subscriptions
   */
  pubSub?: PubSubEngine

  /**
   * Model-specific CRUD configuration
   */
  crudOptions: GraphbackCRUDGeneratorConfig
}
/**
 * Default implementation of the CRUD service offering following capabilities:
 *
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
//tslint:disable-next-line: no-any
export class CRUDService<Type = any> implements GraphbackCRUDService<Type>  {
  protected db: GraphbackDataProvider;
  private pubSub: PubSubEngine;
  private modelName: string;
  private crudOptions: GraphbackCRUDGeneratorConfig;

  public constructor(modelName: string, db: GraphbackDataProvider, config: CRUDServiceConfig) {
    this.modelName = modelName;
    this.crudOptions = config.crudOptions;
    this.db = db;
    this.pubSub = config.pubSub;
  }

  public async create(data: Type, context: GraphbackContext): Promise<Type> {
    const result = await this.db.create(data, context);

    if (this.pubSub && this.crudOptions.subCreate) {
      const topic = this.subscriptionTopicMapping(GraphbackOperationType.CREATE, this.modelName);
      //TODO use subscription name mapping
      const payload = this.buildEventPayload('new', result);
      await this.pubSub.publish(topic, payload);
    }

    return result;
  }

  public async update(data: Type, context: GraphbackContext): Promise<Type> {

    const result = await this.db.update(data, context);

    if (this.pubSub && this.crudOptions.subUpdate) {
      const topic = this.subscriptionTopicMapping(GraphbackOperationType.UPDATE, this.modelName);
      //TODO use subscription name mapping
      const payload = this.buildEventPayload('updated', result);
      await this.pubSub.publish(topic, payload);
    }

    return result;
  }

  //tslint:disable-next-line: no-reserved-keywords
  public async delete(data: Type, context: GraphbackContext): Promise<Type> {
    const result = await this.db.delete(data, context);

    if (this.pubSub && this.crudOptions.subDelete) {
      const topic = this.subscriptionTopicMapping(GraphbackOperationType.DELETE, this.modelName);
      const payload = this.buildEventPayload('deleted', result);
      await this.pubSub.publish(topic, payload);
    }

    return result;
  }

  public findOne(args: Partial<Type>, context: GraphbackContext): Promise<Type> {
    return this.db.findOne(args, context)
  }

  public async findBy(filter: QueryFilter<Type>, context: GraphbackContext, page?: GraphbackPage, orderBy?: GraphbackOrderBy): Promise<ResultList<Type>> {
    let count: number;

    if (context.graphback.options?.aggregations?.count) {
      count = await this.db.count(filter);
    }

    const items: Type[] = await this.db.findBy(filter, context, page, orderBy);

    // set page values for returned object
    const resultPageInfo = {
      offset: 0,
      ...page
    }

    return {
      items,
      count,
      offset: 0,
      ...resultPageInfo
    }
  }

  public subscribeToCreate(filter: any, _context?: GraphbackContext): AsyncIterator<Type> | undefined {
    if (!this.pubSub) {
      throw Error(`Missing PubSub implementation in CRUDService`);
    }

    const operationType = GraphbackOperationType.CREATE
    const createSubKey = this.subscriptionTopicMapping(operationType, this.modelName);
    const subscriptionName = getSubscriptionName(this.modelName, operationType)

    const asyncIterator = this.pubSub.asyncIterator<Type>(createSubKey)

    return withSubscriptionFilter(() => asyncIterator, filter, subscriptionName)()
  }

  public subscribeToUpdate(filter: any, context: GraphbackContext): AsyncIterator<Type> | undefined {
    if (!this.pubSub) {
      throw Error(`Missing PubSub implementation in CRUDService`);
    }

    const operationType = GraphbackOperationType.UPDATE
    const updateSubKey = this.subscriptionTopicMapping(operationType, this.modelName);
    const subscriptionName = getSubscriptionName(this.modelName, operationType)

    const asyncIterator = this.pubSub.asyncIterator<Type>(updateSubKey)

    return withSubscriptionFilter(() => asyncIterator, filter, subscriptionName)()
  }

  public subscribeToDelete(filter: any, context: GraphbackContext): AsyncIterator<Type> | undefined {
    if (!this.pubSub) {
      throw Error(`Missing PubSub implementation in CRUDService`);
    }

    const operationType = GraphbackOperationType.DELETE
    const deleteSubKey = this.subscriptionTopicMapping(operationType, this.modelName);
    const subscriptionName = getSubscriptionName(this.modelName, operationType)

    const asyncIterator = this.pubSub.asyncIterator<Type>(deleteSubKey)

    return withSubscriptionFilter(() => asyncIterator, filter, subscriptionName)()
  }


  public batchLoadData(relationField: string, id: string | number, filter: any, context: GraphbackContext) {
    // TODO use relationfield mapping
    const keyName = `${this.modelName}${upperCaseFirstChar(relationField)}DataLoader`;
    if (!context[keyName]) {
      context[keyName] = new DataLoader<string, any>((keys: string[]) => {
        return this.db.batchRead(relationField, keys, filter, context);
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
