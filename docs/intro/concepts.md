---
id: concepts
title: Graphback Concepts
sidebar_label: Concepts
---

## Code Generator Plugins

Graphback plugins allow developers to modify schema results and generate resources that can be included in your existing project or in a maintained Graphback template.

Please see the **Plugins** section for more details

## Graphback CRUD Runtime

Runtime layer allows you to dynamically swap data source for different models without code generation. 
By default, Graphback assumes all your data comes from an underlying database layer. It creates tables for you,
but you can also point any individual operation or entire model to a different data source.
Abstraction for Services and DB layer gives developers flexibility to support many sources of the data.

![](/img/runtime.png)

Please see the **CRUD** section for more details.

## Database migrations

Graphback provides the option for automatic database migrations, to give you a full backend experience out of the box.
Database migrations are based on your schema with various options for table mapping. 
Currently, Graphback supports many relational databases by using the Knex.js library to perform migrations.

Please follow the **Database** section for more details.

## Integration with existing GraphQL Ecosystem

Graphback integrates with various libraries like:

- GraphbQL-Codegen
- GraphQL-Config
