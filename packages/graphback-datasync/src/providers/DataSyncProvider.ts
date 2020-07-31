import { GraphbackDataProvider, GraphbackContext } from "@graphback/core";

export interface DataSyncProvider<Type = any> extends GraphbackDataProvider<Type> {

  sync(lastSync: number, context: GraphbackContext, filter?: any): Promise<Type[]>;
}
