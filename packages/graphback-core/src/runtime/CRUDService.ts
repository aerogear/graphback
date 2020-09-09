import * as DataLoader from "dataloader";
import { PubSubEngine, withFilter } from 'graphql-subscriptions';
import { GraphQLResolveInfo } from 'graphql';
import { GraphbackCRUDGeneratorConfig, GraphbackOperationType, upperCaseFirstChar, getSubscriptionName } from '..';
import { ModelDefinition } from '../plugin/ModelDefinition';
import { getSelectedFieldsFromResolverInfo, getResolverInfoFieldsList } from '../plugin/getSelectedFieldsFromResolverInfo';
import { createInMemoryFilterPredicate } from './createInMemoryFilterPredicate';
import { FindByArgs } from './interfaces';
import { QueryFilter } from './QueryFilter';
import { GraphbackCRUDService, GraphbackDataProvider, GraphbackContext, ResultList } from '.';

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
  protected model: ModelDefinition;
  protected pubSub: PubSubEngine;
  protected crudOptions: GraphbackCRUDGeneratorConfig;

  public constructor(model: ModelDefinition, db: GraphbackDataProvider, config: CRUDServiceConfig) {
    this.model = model;
    this.crudOptions = config.crudOptions;
    this.db = db;
    this.pubSub = config.pubSub;
  }

  public async create(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    let selectedFields: string[];
    if (info && !this.crudOptions.subCreate) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
    }

    const result = await this.db.create(data, selectedFields);

    if (this.pubSub && this.crudOptions.subCreate) {
      const topic = this.subscriptionTopicMapping(GraphbackOperationType.CREATE, this.model.graphqlType.name);
      //TODO use subscription name mapping
      const payload = this.buildEventPayload('new', result);
      this.pubSub.publish(topic, payload).catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.error(`Publishing of new "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
      });
    }

    return result;
  }

  public async update(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    let selectedFields: string[];
    if (info && !this.crudOptions.subUpdate) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
    }

    const result = await this.db.update(data, selectedFields);

    if (this.pubSub && this.crudOptions.subUpdate) {
      const topic = this.subscriptionTopicMapping(GraphbackOperationType.UPDATE, this.model.graphqlType.name);
      //TODO use subscription name mapping
      const payload = this.buildEventPayload('updated', result);

      this.pubSub.publish(topic, payload).catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.error(`Publishing of updates of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
      });
    }

    return result;
  }

  public async delete(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    let selectedFields: string[];
    if (info && !this.crudOptions.subDelete) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
    }

    const result = await this.db.delete(data, selectedFields);

    if (this.pubSub && this.crudOptions.subDelete) {
      const topic = this.subscriptionTopicMapping(GraphbackOperationType.DELETE, this.model.graphqlType.name);
      const payload = this.buildEventPayload('deleted', result);

      this.pubSub.publish(topic, payload).catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.error(`Publishing of deletion of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
      });
    }

    return result;
  }

  public findOne(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    let selectedFields: string[];
    if (info) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
    }

    return this.db.findOne(args, selectedFields);
  }

  public async findBy(args?: FindByArgs, context?: GraphbackContext, info?: GraphQLResolveInfo, path?: string): Promise<ResultList<Type>> {
    let selectedFields: string[];
    let requestedCount: boolean = false;
    if (info) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model, path);
      requestedCount = path === 'items' && getResolverInfoFieldsList(info).some((field: string) => field === "count");
    }

    const items: Type[] = await this.db.findBy(args, selectedFields);

    // set page values for returned object
    const resultPageInfo = {
      offset: 0,
      ...args.page
    }

    let count: number;
    if (requestedCount) {
      count = await this.db.count(args.filter);
    }

    return {
      items,
      count,
      offset: 0,
      ...resultPageInfo
    }
  }

  public subscribeToCreate(filter?: QueryFilter): AsyncIterator<Type> | undefined {
    if (!this.pubSub) {
      throw Error(`Missing PubSub implementation in CRUDService`);
    }

    const operationType = GraphbackOperationType.CREATE
    const createSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType)

    const asyncIterator = this.pubSub.asyncIterator<Type>(createSubKey)

    const subscriptionFilter = createInMemoryFilterPredicate<Type>(filter)

    return withFilter(() => asyncIterator, (payload: any) => subscriptionFilter(payload[subscriptionName]))()
  }

  public subscribeToUpdate(filter?: QueryFilter): AsyncIterator<Type> | undefined {
    if (!this.pubSub) {
      throw Error(`Missing PubSub implementation in CRUDService`);
    }

    const operationType = GraphbackOperationType.UPDATE
    const updateSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType)

    const asyncIterator = this.pubSub.asyncIterator<Type>(updateSubKey)

    const subscriptionFilter = createInMemoryFilterPredicate<Type>(filter)

    return withFilter(() => asyncIterator, (payload: any) => subscriptionFilter(payload[subscriptionName]))()
  }

  public subscribeToDelete(filter?: QueryFilter): AsyncIterator<Type> | undefined {
    if (!this.pubSub) {
      throw Error(`Missing PubSub implementation in CRUDService`);
    }

    const operationType = GraphbackOperationType.DELETE
    const deleteSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType)

    const asyncIterator = this.pubSub.asyncIterator<Type>(deleteSubKey)

    const subscriptionFilter = createInMemoryFilterPredicate<Type>(filter)

    return withFilter(() => asyncIterator, (payload: any) => subscriptionFilter(payload[subscriptionName]))()
  }

  public batchLoadData(relationField: string, id: string | number, filter: QueryFilter, context: GraphbackContext, info?: GraphQLResolveInfo) {
    const selectedFields = [];
    if (info) {
      const selectedFieldsFromInfo = getSelectedFieldsFromResolverInfo(info, this.model);
      selectedFields.push(...selectedFieldsFromInfo);

      // only push the relation field if there are fields selected
      // because all fields will be selected otherwise
      if (selectedFields.length) {
        selectedFields.push(relationField);
      }
    }

    const fetchedKeys = selectedFields.join('-');
    const keyName = `${this.model.graphqlType.name}-${upperCaseFirstChar(relationField)}-${fetchedKeys}-${JSON.stringify(filter)}-DataLoader`;
    if (!context[keyName]) {
      context[keyName] = new DataLoader<string, any>((keys: string[]) => {
        return this.db.batchRead(relationField, keys, filter, selectedFields);
      });
    }

    // eslint-disable-next-line no-null/no-null
    if (id === undefined || id === null) {
      return [];
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
    payload[`${action}${this.model.graphqlType.name}`] = result;

    return payload;
  }
}
