---
id: custom-resolvers 
title: Using Graphback in custom resolvers 
sidebar_label: Custom Resolvers
---

The model CRUD services created by Graphback are exposed to each resolver through the `context` parameter. Thanks to the flexible CRUD API, you can reuse these services for various use cases in your own resolvers.

In this example, we are going to create a custom query called `getDraftNotes`.

```typescript
import { QueryFilter, GraphbackContext, buildGraphbackAPI } from "graphback";
import { GraphQLResolveInfo } from 'graphql';
import { NoteFilter } from '../generated-types'; // https://graphql-code-generator.com

// define your model
const model = `
""" @model """
type Note {
  id: ID!
  title: String!
}

// highlight-start
type Query {
  getDraftNotes: [Note]
}
// highlight-end
`;

// create your own custom resolvers
const customResolvers = {
  Query: {
    getDraftNotes: async (parent: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      const filter: QueryFilter<NoteFilter> = {
        title: {
          startsWith: '[DRAFT]'
        }
      }

      const results = await context.graphback.Note.findBy({ filter }, context, info);

      return results.items;
    }
  }
}

// generate Graphback schema and resolvers
const { resolvers, typeDefs, contextCreator } = buildGraphbackAPI(model, { ... });

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: [resolvers, noteResolvers], // merge Graphback and custom resolvers
  context: contextCreator
})
```

See the [GraphbackCRUDService API Reference](../api/graphback-core/interfaces/_runtime_graphbackcrudservice_.graphbackcrudservice) for information on the methods and parameters available in the `GraphbackCRUDService` interface.

### context

The [GraphbackContext](../api/graphback-core/interfaces/_runtime_interfaces_.graphbackcontext) interface defines all CRUD services in the `graphback` property. Each service name matches exactly with the name of the model defined in your GraphQL schema.

Accessing the CRUD service for the `Note` model:

```ts
await context.graphback.Note.findBy(args);
```

Because the services and context are create at runtime the properties of `graphback` are dynamically typed. It is recommended that you extend `GraphbackContext` for your resolvers to provide strongly typed services.

You can optionally pass the `Note` type generated with [GraphQL Code Generator](https://graphql-code-generator.com/) as a generic to `GraphbackCRUDService` for additional type-safety.

```ts
import { GraphbackContext, GraphbackCRUDService } from 'graphback';
import { Note } from './generated-types';

interface MyCustomContext extends GraphbackContext {
  graphback: {
    Note: GraphbackCRUDService<Note>
  }
}

const customResolvers = {
  Query: {
    // highlight-start
    getDraftNotes: async (parent: any, args: any, context: MyCustomContext, info: GraphQLResolveInfo) => {
    // highlight-end
      ...
    }
  }
}
```

Each `GraphbackCRUDService` method lets you pass the context as a parameter, as some implementations may use the context in its operations.

```ts
await context.Note.findBy(args, context);
```

### info

The optional `GraphQLResolveInfo` object is available to every resolver and contains information about the GraphQL schema and the current operation.
You can optionally pass this to the `GraphbackCRUDService` method. A common use for this parameter is mapping the selected fields from the GraphQL query to the database query. 

```ts
await context.Note.findBy(args, context, info);
```

### Usage Of `GraphQLResolveInfo`
When using the built an implementation of the `GraphbackCRUDService` interface, such as [CRUDService](../api/graphback-core/classes/_runtime_crudservice_.crudservice.md), Graphback will use the `info` object to map the selected fields from the GraphQL query to the database query. If the requested fields from the GraphQL query are not contained by the `model` held by the service in question, then an empty selection of fields will be sent to the database. For example, if the GraphQL query contains the `Note` model informations, passing the `info` into a
 ```ts
 await context.Comment.findBy(args, context, info)
 ``` 
 will likely return false results or crash in a relational database. 

In order to avoid such cases, we recommend to pass the `info` object only when the fields requested by the incoming GraphQL query are contained by the model. 


### Retrieving Nested Fields From `GraphQLResolveInfo`
If you want to retrieve nested selected fields from the GraphQL query to the database query, you can optionally pass the `nested path` as an argument to the [`findBy`](../api/core/classes/_runtime_crudservice_.crudservice.md#findby) method. 

For example:

If the incoming query is: 

```graphql

query {
  getDraftNotes {
    comments {
      id, 
      description
    }
  }
}
```

And somewhere in your custom resolvers, you'd like to map the `id` and `description` fields for the `Comment` model to the underlying database query, you achieve that with:

```ts

// retrieve all notes using incoming args and info
const { items: allNotes } = await context.Notes.findBy(args, context, info);

const noteIds = allNotes.map(({ id }) => id);

// retrieves comments owned by notes selected above. Specifying the "comments" path so start selection
const { items: comments } = await context.Comment.findBy({ filter: { noteId: { in: noteIds } } }, context, info, 'comments');

// ... do the rest
```
