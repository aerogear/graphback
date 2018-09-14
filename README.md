[![TypeScript version][ts-badge]][typescript-30]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]


## GQLBG - Apollo GraphQL Backend generator

![](resources/gqlb.png)

Auto generate Your database structure, GraphQL resolvers and queries from graphql types 🚀

## Motivation 

GraphQL can be hard and intimidating and hard initially.
GQLBG helps you to kickstart your experience with any existing GraphQL implementation
by generating backend layer using your predefined types.

## What it does

- Generates required queries and mutations automatically using proven GraphQL patterns
- Generates unopiniated resolvers layer using https://www.npmjs.com/package/apollo-resolvers
- Generates database DDL statements that can be used to store data (optional)

## Why to use it

- Plain and most canonical GraphQL implementation
Generated resolvers will work with plain GraphQL solutions.

- Works out of the box with Apollo GraphQL framework
Apollo GraphQL is often 

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

// Register generator for DDL SQL queries
backendGenerator.registerDDL(new SQLSchemaCreator())

// Register resolver generator
backendGenerator.registerResolver(new SQLResolver());

// Set strategy for building relationships between types
backendGenerator.setRelationshipStrategy(new AdditionalTypeStrategy());

// Allow to register what type of operations will be provided
backendGenerator.registerMethods([Method.CREATE, Method.FIND])

// Adds pagination helpers for large amounts of data
backendGenerator.supportPagination(false)

// Flag used to not include query helpers and types (by default true)
backendGenerator.includeAdditionalHelpers(false)
```

3) Generate resources

```typescript
const targetFolder = './output'
backendGenerator.generate(targetFolder);
```

4) Review generated files

```bash
╰─$ ls
NoteDDL.sql
NoteResolvers.js 
NoteSchema.graphql
```

## Supported databases

- Postgress
- MongoDB

## Command line client

WIP

## Integration with Apollo GraphQL

WIP

## Development Quick start

This project is intended to be used with v8 (LTS Carbon) release of [Node.js][nodejs] or newer and [NPM][npm]. Make sure you have those installed. Then just type following commands:

```sh
npm install
```

### Unit tests in JavaScript

Writing unit tests in TypeScript can sometimes be troublesome and confusing. Especially when mocking dependencies and using spies.

This is **optional**, but if you want to learn how to write JavaScript tests for TypeScript modules, read the [corresponding wiki page][wiki-js-tests].

## Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests

## License
Licensed under the APLv2. See the [LICENSE](https://github.com/wtrocki/apollo-resolver-gen/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.0-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%208.9-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v8.x/docs/api/
[travis-badge]: https://travis-ci.org/wtrocki/apollo-resolver-gen.svg?branch=master
[travis-ci]: https://travis-ci.org/wtrocki/apollo-resolver-gen
[typescript]: https://www.typescriptlang.org/
[typescript-30]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/wtrocki/apollo-resolver-gen/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg
[donate]: http://bit.ly/donate-js
[github-watch-badge]: https://img.shields.io/github/watchers/wtrocki/apollo-resolver-gen.svg?style=social
[github-watch]: https://github.com/wtrocki/apollo-resolver-gen/watchers
[github-star-badge]: https://img.shields.io/github/stars/wtrocki/apollo-resolver-gen.svg?style=social
[github-star]: https://github.com/wtrocki/apollo-resolver-gen/stargazers
[jest]: https://facebook.github.io/jest/
[tslint]: https://palantir.github.io/tslint/
[tslint-microsoft-contrib]: https://github.com/Microsoft/tslint-microsoft-contrib
[wiki-js-tests]: https://github.com/wtrocki/apollo-resolver-gen/wiki/Unit-tests-in-plain-JavaScript
[prettier]: https://prettier.io