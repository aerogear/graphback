---
id: concepts
title: Graphback Concepts
sidebar_label: Concepts
---

## Code Generator Plugins

Graphback plugins can be used to modify schema and generate various resources that can be included into your existing project or one of the maintained Graphback templates.

Please follow the **Plugins** section for more details.

## Graphback CRUD Runtime

Runtime layer allows you to dynamically swap datasource for different models without code generation. 
By default Graphback will assume that all your data comes from underlying database layer and even create tables for you,
but you can also point out any individual method or model to different data source. 
Abstraction for Services and DB layer gives developers flexibility to support many sources of the data.

![](/img/runtime.png)

Please follow the **CRUD** section for more details.

## Database migrations

To give you full experience of the out of the box backend graphback provides option for automatic database migrations.
Database migrations are based on your model with various options for table mapping. 
Currently we support many relational databases by utilizing Knex.js library for performing migrations.

Please follow the **Database** section for more details.

## Integration with existing GraphQL Ecosystem

Graphback integrates with various libraries like:

- GraphbQL-Codegen
- GraphQL-Config
