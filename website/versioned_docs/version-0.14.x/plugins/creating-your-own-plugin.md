---
id: create
title: Create your own Graphback plugin
sidebar_label: Create your own plugin
---

You can build your own custom Graphback plugin to:

- automate additional customisations to the final generated schema
- build dynamic resolvers
- create file resources such as client-side queries.

To create your own plugin, start by creating a class that extends `GraphbackPlugin`.

```ts
import { GraphbackPlugin } from 'graphback';

export class MyGraphbackPlugin extends GraphbackPlugin {
  ...
}
```

`GraphbackPlugin` has a number of methods for performing different extensions to your Graphback API.

For the rest of this documentation, we will be using the following business model:

```graphql
""" @model """
type Note {
  id: ID!
  title: String!
  archived: Boolean!
  description: String
  """
  @oneToMany(field: 'note')
  """
  comments: [Comment]!
}

""" @model """
type Comment {
  id: ID!
  text: String
  archived: Boolean! 
  description: String
}
```

## transformSchema

`transformSchema` lets you make modifications to the current iteration of the GraphQL schema object. In here you can create or modify any type or field in the schema. 

As the `GraphQLSchema` and its types are immutable we highly recommend you to install and use the amazing [GraphQL Compose](https://graphql-compose.github.io/) to modify the schema.

```ts
// highlight-start
import { GraphbackPlugin, GraphbackCoreMetadata } from 'graphback';
import { GraphQLSchema, GraphQLSchema, GraphQLList, GraphQLNonNull } from 'graphql';
import { SchemaComposer } from 'graphql-compose-extended';
// highlight-end

export class MyGraphbackPlugin extends GraphbackPlugin {
  // highlight-start
  transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
    const schema = metadata.getSchema()
    const schemaComposer = new SchemaComposer(schema)
    const graphbackModels = metadata.getModelDefinitions()

    for (const model of graphbackModels) {
      schemaComposer.Query.addFields({
        [`getArchived${model.graphqlType.name}s`]: {
          type: GraphQLNonNull(GraphQLList(model.graphqlType))
        }
      })
    }

    return schemaComposer.buildSchema()
  }
  // highlight-end
  ...
}
```

In `MyGraphbackPlugin`, the `transformSchema` hook adds a new query field to the schema for each of the data models to retrieve all archived models.

```graphql
type Query {
  getNote(id: ID!): Note
  findNotes(filter: NoteFilter, page: PageRequest, orderBy: OrderByInput): NoteResultList!
  getComment(id: ID!): Comment
  findComments(filter: CommentFilter, page: PageRequest, orderBy: OrderByInput): CommentResultList!
  // highlight-start
  getArchivedNotes: [Note]!
  getArchivedComments: [Comment]!
  // highlight-end
}
```

## createResolvers

With the `createResolvers` hook you can create and return resolvers using the [`graphql-tools`](https://www.graphql-tools.com/docs/resolvers/) format.

To use `createResolvers` you will first need to install `@graphql-tools/utils`:

```bash
yarn add @graphql-tools/utils
```

Here `createResolvers` is creating a new query resolver for each query field added to the schema in [`transformSchema`](#transformschema).

```ts
import { GraphbackPlugin, GraphbackCoreMetadata } from 'graphback';
import { GraphbackContext, getSelectedFieldsFromResolverInfo, QueryFilter  } from '@graphback/core';
import { GraphQLResolveInfo } from 'graphql';

// highlight-start
import { IResolvers, IObjectTypeResolver } from '@graphql-tools/utils';
// highlight-end

export class MyGraphbackPlugin extends GraphbackPlugin {
  ...
  // highlight-start
  createResolvers(metadata: GraphbackCoreMetadata): IResolvers {
    const resolvers: IResolvers = {};
    const queryObj: IObjectTypeResolver = {};

    // loop through every Graphback model
    for (const model of metadata.getModelDefinitions()) {
      const modelName = model.graphqlType.name;

      // create a resolver function for every query field created in `transformSchema`
      queryObj[`getArchived${modelName}s`] = async (_: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
        const crudService = context.graphback.services[modelName];

        // create a filter in the GraphQLCRUD format to retrieve only archived Notes
        const filter: QueryFilter = {
          archived: {
            eq: true
          }
        };

        // retrieve user selected fields from GraphQLResolveInfo which will be used to query the database for specific fields
        // avoiding overfetching. This is optional, as passing just the context to the database query will retrieve all fields.
        const selectedFields = getSelectedFieldsFromResolverInfo(info, model);
        const graphback = {
          services: context.graphback.services,
          options: { selectedFields }
        };

        // use the model service created by Graphback to query the database
        const { items } = await crudService.findBy(filter, { ...context, graphback });

        return items;
      }
    }

    resolvers.Query = queryObj;

    return resolvers;
  }
  // highlight-end
}
```


## createResources

Since Graphback is primarily a runtime framework, you probably won't use `createResources` too often. However it is a very useful method if you ever need to output something to a file, such as your schema.

Here `createResources` is creating a GraphQL schema file from the schema generated by Graphback.

```ts
import { GraphbackPlugin, GraphbackCoreMetadata } from 'graphback';
// highlight-start
import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
// highlight-end

export class MyGraphbackPlugin extends GraphbackPlugin {
  ...
  // highlight-start
  createResources(metadata: GraphbackCoreMetadata): void {
    const schema = metadata.getSchema()
    const schemaSDL = printSchema(schema)

    writeFileSync('./schema.graphql', schemaSDL);
  }
  // highlight-end
}
```

## getPluginName

Returns a unique name of the plugin. The will be used by plugin registry to uniquely identify the plugin.  

```ts
import { GraphbackPlugin, GraphbackCoreMetadata } from 'graphback';
// highlight-next-line
import { writeFileSync } from 'fs';

export class MyGraphbackPlugin extends GraphbackPlugin {
  ...
  // highlight-start
  getPluginName() {
    return 'MyGraphbackPlugin';
  }
  // highlight-end
}
```

## Usage

To use the plugin, add it to the `plugins` array in [`buildGraphbackAPI`](../api/build-graphback-api#plugins).

```ts
const { resolvers, typeDefs, contextCreator } = buildGraphbackAPI(modelDefs, {
  dataProviderCreator: createKnexDbProvider(db),
  plugins: [
    // highlight-start
    new MyGraphbackPlugin()
    // highlight-end
  ]
});

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: contextCreator
})

...
```

Archived `Notes` or `Comments` can be retrieved by the following query:


```graphql
query archivedNotesAndComments {
  getArchivedNotes {
    id
    title
    comments {
      id
      archived
      text
    }
  }

  getArchivedComments {
    id
    text
    note {
      id
      archived
      title
    }
  }
}
```
