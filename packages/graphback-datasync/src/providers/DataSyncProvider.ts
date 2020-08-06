import { GraphbackDataProvider, GraphbackContext } from "@graphback/core";

export interface DataSyncProvider<Type = any> extends GraphbackDataProvider<Type> {

  sync(lastSync: Date, context: GraphbackContext, filter?: any, limit?: number): Promise<Type[]>;
}
