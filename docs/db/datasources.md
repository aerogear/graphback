---
id: datasources
title: Data Sources
---

## Data Sources

Graphback allows you to work with different database systems and other data sources, according to your needs.
Graphback provides support to multiple databases when performing migrations.

Our migration engine is based on Knex.js and we are actively supporting and testing the following database systems:

- PostgreSQL (Using Knex.js)
- MySQL (Using Knex.js) 
- SQLite (No database fields mapping supported)
- MongoDB (No database fields mapping supported)
early version based on MongoDriver - @graphback/runtime-mongodb

This databases are supported for relational database schema migration. 
Graphback `CRUD Runtime abstraction` allows developers to use any type of datasource.
