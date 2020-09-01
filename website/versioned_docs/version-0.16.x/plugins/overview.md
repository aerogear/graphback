---
id: overview
title: Plugins Overview
sidebar_label: Overview
---

With Graphback plugins you can customise the generation of the GraphQL schema, automate the generation of resolvers, and create file resources such as client-side queries.

Plugins are executed in the order that are defined in the `plugins` array. Each plugin passes its modified version of the GraphQL schema to the next, making incremental changes to the schema and outputs the final schema once the plugin chain is complete.

Graphback offers a standard suite of plugins you can use to generate a [GraphQLCRUD](https://graphqlcrud.org/) compliant schema, resolvers and client documents.