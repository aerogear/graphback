import { ClientGeneratorPluginConfig } from '@graphback/codegen-client';
import { ResolverGeneratorPluginConfig } from "@graphback/codegen-resolvers"
import { SchemaCRUDPluginConfig } from '@graphback/codegen-schema';
import { GraphbackCRUDGeneratorConfig } from '@graphback/core';

/**
 * Global configuration for Graphback ecosystem that represents each plugin 
 */
export interface GraphbackConfig {
  crud?: GraphbackCRUDGeneratorConfig
  //Plugins configuration
  plugins?: {
    ResolversCRUD?: ResolverGeneratorPluginConfig
    SchemaCRUD?: SchemaCRUDPluginConfig
    ClientCRUD?: ClientGeneratorPluginConfig
  } | any
}