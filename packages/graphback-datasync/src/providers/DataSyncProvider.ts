import { GraphbackDataProvider, GraphbackContext, QueryFilter } from "@graphback/core";

export interface DataSyncProvider<Type = any> extends GraphbackDataProvider<Type> {

  sync(lastSync: Date, selectedFields?: string[], filter?: QueryFilter, limit?: number): Promise<Type[]>;
}
