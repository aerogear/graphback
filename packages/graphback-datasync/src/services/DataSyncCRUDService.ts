import { CRUDService, ResultList, GraphbackOrderBy, GraphbackPage, GraphbackDataProvider, GraphbackPubSub } from "@graphback/runtime-mongo"
import { GraphQLObjectType } from "graphql";
import { DataSyncProvider } from "../providers";

export interface SyncList<T> {
    items: T[],
    lastSync: string
}

/**
 * CRUD Service for datasync
 */
export class DataSyncCRUDService<T = any> extends CRUDService<T> {

    public constructor(modelType: GraphQLObjectType, db: DataSyncProvider, subscriptionConfig: GraphbackPubSub, logger?: any) {
        super(modelType, db, subscriptionConfig, logger);
    }
    /**
     * sync
     * For delta queries
     */
    public async sync(lastSync: string, context?: any): Promise<SyncList<T>> {
    
        const res = await (this.db as DataSyncProvider).sync(lastSync);

        return {
            items: res,
            lastSync: Date.now().toString()
        }
    }
}