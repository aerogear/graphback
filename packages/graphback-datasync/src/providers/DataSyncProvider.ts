import { GraphbackDataProvider, GraphbackContext, } from "@graphback/runtime";

export interface DataSyncProvider<Type = any> extends GraphbackDataProvider<Type> {

  sync(lastSync: string, context: GraphbackContext, filter?: any): Promise<Type[]>;
}
