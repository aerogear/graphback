import { GraphbackOperationType, upperCaseFirstChar, GraphbackDataProvider, GraphbackCRUDGeneratorConfig, GraphbackCRUDService, ResultList, GraphbackOrderBy, GraphbackPage } from "@graphback/core"
import * as DataLoader from "dataloader";
import { PubSubEngine } from 'graphql-subscriptions';
import { defaultLogger, GraphbackMessageLogger } from '../utils/Logger';

/**
 * Configurations necessary to create a CRUDService
 */
export interface CRUDServiceConfig {
  /**
   * PubSub implementation for creating subscriptions
   */
  pubSub?: PubSubEngine
  /**
   * Optional logging service
   */
  logger?: GraphbackMessageLogger
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
export class CRUDService<T = any> implements GraphbackCRUDService<T>  {
  protected db: GraphbackDataProvider;
  private logger: GraphbackMessageLogger;
  private pubSub: PubSubEngine;
  private modelName: string;
  private crudOptions: GraphbackCRUDGeneratorConfig;

  public constructor(modelName: string, db: GraphbackDataProvider, config: CRUDServiceConfig) {
    this.modelName = modelName;
    this.crudOptions = config.crudOptions;
    this.db = db;
    this.pubSub = config.pubSub;
    this.logger = config.logger || defaultLogger;
  }

  public async create(data: T, context?: any): Promise<T> {
    this.logger.log(`Creating object ${this.modelName}`);

    const result = await this.db.create(data, context);

    if (this.pubSub && this.crudOptions.subCreate) {
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

    if (this.pubSub && this.crudOptions.subUpdate) {
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

    if (this.pubSub && this.crudOptions.subDelete) {
      const topic = this.subscriptionTopicMapping(GraphbackOperationType.DELETE, this.modelName);
      const payload = this.buildEventPayload('deleted', result);
      await this.pubSub.publish(topic, payload);
    }

    return result;
  }

  public findOne(args: Partial<T>, context?: any): Promise<T> {
    this.logger.log(`fetching single object ${this.modelName} with args ${JSON.stringify(args)}`)

    return this.db.findOne(args, context)
  }

  //tslint:disable-next-line: no-any
  public async findBy(filter: any, orderBy?: GraphbackOrderBy, page?: GraphbackPage, context?: any): Promise<ResultList<T>> {
    this.logger.log(`querying object ${this.modelName} with filter ${JSON.stringify(filter)}`)

    const items = await this.db.findBy(filter, orderBy, page, context);

    // set page values for returned object
    const resultPageInfo = {
      offset: 0,
      ...page
    }

    return {
      items,
      offset: 0,
      ...resultPageInfo
    }
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


  public batchLoadData(relationField: string, id: string | number, filter: any, context?: any) {
    //TODO use relationfield mapping
    const keyName = `${this.modelName}${upperCaseFirstChar(relationField)}DataLoader`;
    if (!context[keyName]) {
      context[keyName] = new DataLoader<string, any>((keys: string[]) => {
        return this.db.batchRead(relationField, keys, filter);
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
