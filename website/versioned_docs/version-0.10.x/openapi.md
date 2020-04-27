---
title: OpenAPI migrations
id: openapi
---

## OpenAPI spec migration

OpenAPI (Swagger) is a specification for describing RESTful APIs.
A specification can be generated based on an existing API with many open source solutions. 

Developers can also utilize various OpenAPI generators thanks to [OpenAPI Generator](https://openapi-generator.tech) project.
Generating a GraphQL schema from OpenAPI will almost always come with some information loss.
Due to the strongly typed nature of GraphQL additional elements like Interfaces, Enums and Scalars 
do not have direct mapping in OpenAPI definitions. 

When working with Graphback developers can generate or manually build their existing 
OpenAPI definition and then transform it into a GraphQL schema.

## Migration workflow

To migrate simply put your OpenAPI definition into the model folder (both YAML and JSON are supported)
and execute:

`graphback openapi` 

By default the command will strip out all methods and leave only the OpenAPI types.
Developers can manually apply Graphback annotations and tweak the schema for their own needs.

> NOTE: Migration is going to apply `ID!` type only when OpenAPI definition is 
using UUID type. In other scenarios `ID!` type needs to be applied manually to 
object.