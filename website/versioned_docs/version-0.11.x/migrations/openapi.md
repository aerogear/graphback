---

title: Migrating from REST
id: openapi
---

OpenAPI (Swagger) is a specification for describing RESTful APIs.
A specification can be generated based on an existing API with many open source solutions. 

Developers can also utilize various OpenAPI generators thanks to [OpenAPI Generator](https://openapi-generator.tech) project.
Generating a GraphQL schema from OpenAPI will almost always come with some information loss.
Due to the strongly typed nature of GraphQL, additional elements like Interfaces, Enums and Scalars 
do not have direct mapping in OpenAPI definitions. 

When working with Graphback, developers can generate or manually build their existing 
OpenAPI definition and then transform it into a GraphQL schema.

## Migrating from REST

To migrate from your REST API put your OpenAPI definition file into your model folder (both YAML and JSON are supported) and run:

```
graphback openapi
```

This will generate a new `.graphql` data model file in your model folder. This will remove all methods and leave only GraphQL data types.

> NOTE: Migration is going to apply `ID!` type only when OpenAPI definition is 
using UUID type. In other scenarios `ID!` type needs to be applied manually to 
object.

These GraphQL data types are missing some annotations that will allow them to be processed by Graphback. See [Data Model](../intro/datamodel) to complete your data model.

Once your data model is complete, run `graphback generate` to process and generate a complete schema and CRUD resolvers.