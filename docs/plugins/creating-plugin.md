---
id: customplugin
title: Creating your own plugin
sidebar_label: Custom plugin
---

Graphback allows to create your own plugins that can affect generated schema 
and create files in filesystem.

Each plugin needs to be an new npm package that will implement GraphbackPlugin.

## Building your plugin

Graphback plugins are executed in the order they are defined in the configuration.
`transformSchema` is called first for each plugin to determine final shape of the schema.
Then `createResources` method is called that can create files etc.

Example plugin implementation should look as follows:

```ts
import { GraphbackPlugin, GraphbackCoreMetadata } from '@graphback/core';

export class YourPlugin extends GraphbackPlugin {
    private pluginConfig: any;

    // Constructor needs to accept single argument - plugin config
    constructor(pluginConfig?: any) {
        super();
        this.pluginConfig = pluginConfig;
    }

    public transformSchema(metadata: GraphbackCoreMetadata) {
        // This method can be used to add or remove elements from current schema.
        return metadata.getSchema();
    }

    public createResources(metadata: GraphbackCoreMetadata): void {
        // This method is used to create files in filesystem based on the models
        metadata.getModelDefinitions().forEach(model => {
            writeFileSync(`${process.cwd()}/${model.graphqlType.name}.js`, `const def = '${model.graphqlType.getFields()}'`)
        })
    }

    public getPluginName(): string {
        return 'MyPlugin';
    }
}

// Package needs to export created plugin as `Plugin`
export { ClientCRUDPlugin as Plugin } from './ClientCRUDPlugin'
```

> NOTE: Plugin name cannot start with `graphback-` as this name is reserved for graphback internal plugins

## Plugin configuration

Plugins are loaded using commonjs require method based on the graphback plugin section.
Each plugin should have his own configuration embeeded as folows.
Order of the plugins matter especially when transforming schema.
If your plugin relies on other plugins it should be placed on the bottom of the list.

```yaml
  graphback:
    ## Codegen plugins
    plugins:
        my-plugin:
          format: 'graphql'
          outputPath: ./server/src/schema
        graphback-client:
          format: 'graphql'
          outputPath: ./client/src/graphql
        graphback-resolvers:
          format: ts
          outputPath: ./server/src/resolvers

```

## Plugins helper

'@graphback/core' offers helpers for building plugins. 
Please refer to the package documentation for more details.

