---
id: crudruntime
title: CRUD Runtime abstraction
sidebar_label: CRUD Abstraction
---

## Graphback CRUD Abstraction

Graphback CRUD abstraction available as part of the @graphback/runtime package provides a way to programatically define different datasources and configure them without code generation.

Runtime is abstracted into two interfaces:

- GraphbackCRUDService - should be used to implement custom behaviour like subscriptions or live queries
- GraphbackDataProvider - should be used

Graphback provides default implementation for this interfaces

### GraphbackCRUDService

- CRUDService - implements subscriptions and logging. Used by default in resolver generator.

### GraphbackDataProvider

- KnexDBDataProvider - Knex.js wrapper that connets to many relationnal databases
- DBKnexDBDataProvider - Flavour of Knex.JS wrapper that is optimized to work with PostgreSQL Database

## How Runtime relates to the resolvers

Graphback resolver generator plugin generates resolvers that utilize one of the preconfigured `GraphbackCRUDService` implementations.
`GraphbackCRUDService` implementation is using `GraphbackDataProvider`.

![](/img/runtime.png)

Instances need to be added to `context` object in resolver for example:

```js
findAllComments: (parent, args, context) => {
  // Comment is an implementation of `GraphbackCRUDService` 
  return context.Comment.findAll();
};
```


## Modifying implementation

Graphback plugin will generate `createContext.ts` file that creates instances of your model.
Developers can modify them and point them to the different datasources without using code generation.

To use runtime developers need to call `createCRUDResolversRuntimeContext` from `createContext.ts` when creating their GraphQL Server:

```ts
   const context = createCRUDResolversRuntimeContext({ schema, db, pubSub });
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers,
        context,
        playground: true,
    })
```

## Motivation behind CRUD abstraction

Code generators produce a large amount of the code that needs to be maintained later.
Having generator code diverging from original form will prevent developers to utilize generators.
Graphback tries to address many challenging issues like data caching, batching, consistency etc. that will be hard to implement and test by utilizing only code generation.
That is why our default resolver generators rely on CRUD abstraction layer that can be used to connect Graphback to any datasource without writing generator plugin.