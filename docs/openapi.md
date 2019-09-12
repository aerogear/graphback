---
id: openapi
title: OpenAPI migrations
---

## OpenAPI spec migration

OpenAPI (Swagger) is an specification for describing RESTfull API.
Specification can be generated based on existing API with many open source solutions. 

Developers can also utilize various OpenAPI generators thanks to https://openapi-generator.tech project.
Generating GraphQL schema from OpenAPI will almost always come with some information loss.
Strongly typed nature of GraphQL and additional elements like Interfaces, Enums and Scalars 
do not have direct mapping in OpenAPI definitions. 

When working with Graphback developers can generate or manually build their existing 
OpenAPI definition and then transform it to GraphQL schema

## Migration workflow

To migrate simply put your OpenAPI definition into model folder (both yaml and json are supported)
and execute graphback command:

`graphback openapi` 

By default command will stip out all methods and leave only the OpenAPI types.
Developers can manually apply Graphback directives and tweak schema for their own needs.
