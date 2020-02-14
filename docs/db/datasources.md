---
id: datasources
title: Data Sources
---

## Data Sources

Graphback allows you to work with different database systems and other data sources, according to your needs.
Graphback provides support to multiple databases when performing migrations.

Our migration engine is based on Knex.js and we actively supporting and testing following database systems:

- PostgreSQL
- MySQL 
- SQLite (Limited ability to modify tables - requires recreation of the database for each change)

This databases are supported for relational database schema migration. 
Graphback `CRUD Runtime abstraction` allows developers to use any type of datasource
