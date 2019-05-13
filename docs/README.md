## GQLBG - GraphQL Backend generator

![](gqlb.png)

Auto generate database structure, GraphQL resolvers and queries from GraphQL types 🚀

## Motivation 

GraphQL can be hard and intimidating initially.
GQLBG helps you to kickstart your experience with any existing GraphQL implementation
by generating backend layer using your predefined types.

## What it does

- Generates required queries and mutations automatically using proven GraphQL patterns
- Generates unopiniated resolvers layer using https://www.npmjs.com/package/apollo-resolvers
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
