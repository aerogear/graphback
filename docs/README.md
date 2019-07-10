## Graphback - GraphQL Backend generator

![](images/graphback.png)

Auto generate database structure, GraphQL resolvers and schema from GraphQL types 🚀 (Not yet production ready, still under development)

## Motivation 

GraphQL can be hard and intimidating initially.
Graphback helps you to kickstart your experience with any existing GraphQL implementation
by generating backend layer of SDL and resolvers using your predefined types. It makes it easy to get started with GraphQL.

## What it does

- Generates required queries and mutations automatically using proven GraphQL patterns
- Generates unopiniated type safe resolvers layer using https://www.npmjs.com/package/@graphql-codegen/cli
- Generates database DDL statements that can be used to store data (optional)

## Why to use it

- Plain and most canonical GraphQL implementation
Generated resolvers will work with plain GraphQL solutions.

- Works out of the box with Apollo GraphQL

- Full freedom - generated resources can be edited and reconfigured later 

- Custom directives out of the box
Provides set of useful directives and input types that are resolving standard use cases

- Auto generated schema basing on best GraphQL patterns 

- Pick your own server framework and clients (works with Apollo Express and Hapi) 

- Pick your own database
Solution abstract from database storage possibly allows to support any existing storage, by 
implementing available interface

## Roadmap

- Support schema first and resolver first approach
Currently supporting only schema first aproach for generation.


## License
Licensed under the APLv2. See the [LICENSE](https://github.com/wtrocki/graphql-resolver-gen/blob/master/LICENSE) file for details.
