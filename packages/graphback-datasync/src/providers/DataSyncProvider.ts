import { GraphbackDataProvider, } from "@graphback/runtime";

export interface DataSyncProvider<Type = any, GraphbackContext = any> extends GraphbackDataProvider<Type,GraphbackContext> {

    sync(lastSync: string, filter?: any, context?: GraphbackContext): Promise<Type[]>;
}