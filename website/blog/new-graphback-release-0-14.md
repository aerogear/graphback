---
title: Improving the GraphQL experience with Graphback 0.14
author: Manyanda Chitimbo
author_title: Software Engineer
author_url: https://github.com/machi1990
author_image_url: https://avatars3.githubusercontent.com/u/10106536?s=460&u=ba1f66c0295c5151f147dd869a543bdc68671c56&v=4
tags: [graphql, graphback, graphqlcrud, graphql-js, nodejs, release]
image: https://graphback.dev/img/logo.png
---

## TL;DR:
Over the past couple of months, we have been working on improving Graphback. We are excited to announce that we have released Graphback 0.14.0, bringing a new and improved CRUD and runtime experience.
Most notable changes in this release:

- Full implementation of the CRUD API specification
- Improved runtime API to remove complexity of setting up a Graphback API
- RBAC Authorization on top of the Graphback Service and Keycloak

The complete changelog is available at https://graphback.dev/docs/releases#0140

<!--truncate-->

## Introduction to Graphback

<div style={{textAlign: 'center', width: '400px', height: '400px'}}>

![Graphback logo](https://graphback.dev/img/logo.png)

</div>

Graphback simplifies application development by generating a production-ready API from data models to access data from one or more data sources. Graphback uses [GraphQL](https://graphql.org) and follows [GraphQLCRUD](https://graphqlcrud.org/) specification to make it easy to get the data you need. Graphback follows the convention over configuration paradigm to reduce the amount of setup and boilerplate costs associated with creating GraphQL applications.

With Graphback you can build and deploy a scalable data-driven GraphQL API, complete with real-time updates and data synchronization capabilities, using either a MongoDB or PostgreSQL database which is automatically created from your GraphQL schema. Graphback can be consumed as addition to your existing GraphQL project or even out of the box server (by using [GraphQL-Serve cli](https://graphback.dev/docs/graphqlserve/graphqlserve))

Graphback offers various plugins that can modify schema or generate files like client-side GraphQL documents for your mobile or web app.

If you want to try out Graphback, check out the [getting started guide](https://graphback.dev/docs/getting-started/create-new-app).

We have just released [Graphback 0.14](https://graphback.dev/docs/releases#0140). It comes with the following changes.

## Notable Changes

### Full Implementation of CRUD specification
Graphback provides an implementation of [GraphQLCRUD](https://graphqlcrud.org/) for a standardised CRUD API using common data access patterns. Providing a spec compliant implementation will enable Graphback to be interoperable with other GraphQL libraries. What this means for consumers is  flexibility and portability in choosing or changing a GraphQL CRUD provider. 

Graphback generates a CRUD API for each model in your GraphQL schema. This gives you queries, mutations and subscriptions that can be instantly used to perform queries, filtering, pagination and mutations on your data.

Additionally, we have made it easy to define custom queries, mutations and subscriptions that utilize the input types and filters created by Graphback. This approach let’s you control the schema as you would when building it from scratch, while significantly reducing the amount of boilerplate required to set it up from your data.

### New Runtime API

#### Building CRUD API
        
We have significantly refactored the runtime API to reduce overall complexity of configuring and using Graphback. Essentially we have cut out a multi-step approach to configuring a Graphback server and made it into a single function API to create the services, resolvers, datasources and schema.

The new runtime API brings:
- Ability to configure different data providers 
- Ability to configure services automatically e.g Authorization and subscriptions services, and  compose them.
- Ability to supply plugins, including custom ones without having to rely on external configuration file

```ts
const { typeDefs, resolvers, contextCreator, services } = buildGraphbackAPI(schema, {
  dataProviderCreator: createKnexDbProvider(dbConfig),
  plugins: []
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextCreator
})
```

#### Runtime generation of resolvers / schema in server side

In previous versions, Graphback would generate the schema and corresponding resolvers and leave it to the user to import them. This approach was erroneous since: 

- If you forgot to run the generation command, the server will start with previous generated code, or crash. 
- The generated code was not heavily typed causing compilation and linting errors 
- The generated code was source of git conflicts
- A cause of cognitive load as you still have to know which file was generated and have to manually load the resolvers and use it in your GraphQL server.

The overall experience was hard to work with especially in a development environment and a source of failures in production in case of an oversight to refresh the generated resolvers. 

We are happy to announce that we have worked around all these issues to improve the overall experience by parsing the schema and creating resolvers during application startup.

#### Refined annotations 
This release changes how annotations are specified in the GraphQL schema. The new annotation format closely resembles the syntax of native directives that the GraphQL community is familiar with. For example a one to one relationship is now declared as follows

```graphql
"""
@oneToOne(key: 'user_id')
"""
```

Instead of the previous version

```graphql
"""
@oneToOne key: 'user_id'
"""
```
 
We think that this syntax based on our upstream [graphql-metadata](https://www.npmjs.com/package/graphql-metadata) library is less error prone and its familiarity will lower the learning curve for most of our annotations.

#### Create dynamic resolvers for your models using plugin API

In [0.12.0](https://graphback.dev/docs/releases/#0120) we introduced a flexible plugin architecture enabling plugin developers to be able to transform the GraphQL schema. In this release we have addressed the requests from the community and made some changes to the plugin engine to allow [creation of resolvers](https://github.com/aerogear/graphback/pull/1455) (separate from the schema). Resolvers created in this way, will be merged into a resolver object that’s exposed by the Graphback API making it easier for users to integrate them. Visit the [create your plugin page](https://graphback.dev/docs/plugins/create#createresolvers) to learn more. 


### New packages

Within this release, we have added three new packages:

#### [Keycloak-authz](https://graphback.dev/docs/authentication/keycloak)  

RBAC Authorization on top of the Graphback Service layer declarative code and schema driven RBAC for Graphback. The package is built on top of [keycloak-connect](https://www.npmjs.com/package/keycloak-connect) and [keycloak-connect-graphql](https://www.npmjs.com/package/keycloak-connect-graphql) thus giving deeper [Keycloak](https://www.keycloak.org/) integration in your GraphQL applications. This enables you to declaratively add authorization capabilities like role based access on top of the CRUD model that is used within Graphback. 

This package is still in preview and under active development and your feedback is highly welcomed.

#### [Data Synchronization](https://graphback.dev/docs/datasync/intro) 

This package contains a plugin as well as compatible data sources for implementing Data Synchronisation using Graphback. The package provides an API to:
- Fetch data that was changed based on the client side timestamp
- Ensure data consistency using timestamp provided

It achieves this by:
- Providing Delta Queries that can be used by GraphQL clients to refresh changes in data between periods of connectivity outages. 
- Providing server-side Conflict Resolution capabilities

Currently, the datasync package only supports the Mongo data sources with support for other data sources planned in the future release. This package is still in preview and under active development and your feedback is highly welcomed.

#### [create-graphback](https://graphback.dev/docs/cli/create-graphback) 

This package provides a small command line utility that can be used to quickly create production ready Graphback projects. The tool integrates well with the Node.js ecosystem: npx, npm etc


### Improved Documentation

There have been a number of major changes between 0.12.x and 0.14. The documentation and website also underwent major restructuring to adapt to the significant changes in Graphback. We took this chance to simplify and focus the documentation to make it the best experience possible for users.

## Migrating From 0.12

We have tried to make the migration path as smooth as possible by documenting all the major and breaking changes in the [release notes](https://graphback.dev/docs/releases#0140). We are hoping this to be sufficient, but we concede that some things might be missing and we are more than happy to help out in this migration: reach to us via [chat][(https://github.com/aerogear/graphback](https://discord.com/invite/mJ7j84m)) or by [opening a Github issue](https://github.com/aerogear/graphback/issues/new).

## What's on the next release? 
 
The next release is 0.15. This will be a stable 1.0.0 beta release and the list of issues that will focus on addressing the [0.15 milestone](https://github.com/aerogear/graphback/issues?q=is%3Aopen+is%3Aissue+milestone%3Agraphback%400.15.0).
   
If there is something that you would like to see in this release, [open an issue](https://github.com/aerogear/graphback/issues/new) and we can prioritize it. 


## How to get involved? 

We love our community and are strongly tied to it. You can get involved with us using: 
- [Graphback Project on GitHub](https://github.com/aerogear/graphback) 
- [Discord](https://discord.com/invite/mJ7j84m) 

## Those who made the release possible

We are really happy to have reached this milestone but it would not have been possible without the amazing work from the community: 
[@craicoverflow](https://github.com/craicoverflow), [@darahayes](https://github.com/darahayes), [@Eunovo](https://github.com/Eunovo), [@joaedwar](https://github.com/joaedwar), [@kingsleyzissou](https://github.com/kingsleyzissou), [@lastmjs](https://github.com/lastmjs), [@machi1990](https://github.com/machi1990), [@martinhesko](https://github.com/martinhesko), [@ssd71](https://github.com/ssd71), [@wtrocki](https://github.com/wtrocki)

Thank you!!
