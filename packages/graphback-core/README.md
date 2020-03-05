## Graphback

<p align="center">
  <img width="400" src="https://github.com/aerogear/graphback/raw/master/website/static/img/graphback.png">
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

**Documentation**: https://graphback.dev
**Repository**: https://github.com/aerogear/graphback/

## Graphback-Core 

Codegen core package is an abstraction that provides common entry point to all graphback generators:
- Client generator
- Schema generator
- Various resolver generators
- Various Service layer generators
- Various DBLayer generators

`InputProcessor` abstraction provides seamless way for providing valid input for generators. 

> Note: This package is not designed to be used directly.


## Adding support for new inputs types

Graphback-Codegen-Input by default relies on GraphQL schema model as input. 
However it can support any type of inputs like json schema, database or OpenAPI definitions.

Developers can extend functionality by using `InputProcessor` abstraction.

## Generator config

Each individual type will contain individual config. Developers can pass global configuration that will be applied to every type

See `GraphbackCRUDGeneratorConfig` for more information.

Config can be modified directly in the schema by utilizing [`graphql-metadata`](graphql-metadata):

## Contributing

`./api` folder contains all types required for creating input processors
`./graphql` folder contains implementation that builds GraphQL based processors
