---
id: customplugin
title: Creating your own plugin
sidebar_label: Custom plugin
---

Graphback allows to create your own plugins that can affect generated schema 
and create files in filesystem.

Each plugin needs to be a new npm package that will implement GraphbackPlugin.

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

Plugins are loaded using CommonJS 'require' method based on the Graphback plugin section.
Order of the plugins matter especially when transforming schema.
If your plugin relies on other plugins, it should be placed on the bottom of the list.
Each plugin should have its own configuration embedded as follows:

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

```

> NOTE: Graphback CLI includes Graphback core plugin. When adding your own plugins, you need to run Graphback CLI from your npm scripts
for the Graphback engine to be able to pick up the plugin package.

## Plugins helper

'@graphback/core' offers helpers for building plugins. 
Please refer to the package documentation for more details.
