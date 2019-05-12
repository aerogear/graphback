[![TypeScript version][ts-badge]][typescript-30]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]


## GQLBG - GraphQL Backend generator

![](resources/gqlb.png)

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

## Getting Started

1) Create GraphQL schema
```graphql
const exampleDefinition = 
    type Note {
        title: String!
        description: String!
    }
```

2) Configure generator

```typescript
const backendGenerator = new GraphQLBackend(exampleDefinition);
```

3) Generate resources

```typescript
backend.createBackend().then((generated: IGraphQLBackend) => {
  console.log(generated)
});
```

See [example](./example/index.ts) for more advanced use case.

## Supported databases

- Postgress
- MongoDB (WIP)

## Command line client

WIP

## Contribution

This project is intended to be used with v8 (LTS Carbon) release of [Node.js][nodejs] or newer and [NPM][npm]. Make sure you have those installed. Then just type following commands:

```sh
npm install
npm run build
```

### Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests


## Roadmap

- Support schema first and resolver first approach
Currently supporting only schema first aproach for generation.
We should allow users to define their relationships by defining types.


## License
Licensed under the APLv2. See the [LICENSE](https://github.com/wtrocki/graphql-resolver-gen/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.0-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%208.9-blue.svg
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[typescript-30]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html
[nodejs]: https://nodejs.org/dist/latest-v8.x/docs/api/
[license]: https://github.com/wtrocki/graphql-resolver-gen/blob/master/LICENSE
[prs]: http://makeapullrequest.com
