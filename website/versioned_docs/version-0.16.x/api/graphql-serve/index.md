---
id: "index"
title: "graphql-serve"
sidebar_label: "README"
---

## Graphback

<p align="center">
  <img width="400" src="https://raw.githubusercontent.com/aerogear/graphback/master/website/static/img/logo.png"/>
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

**Documentation**: https://graphback.dev
**Repository**: https://github.com/aerogear/graphback/

# graphql-serve

Fully functional GraphQL Server based on Graphback CRUD Specification

graphql-serve is a full-featured GraphQL server, based on
[Graphback](https://graphback.dev/) and
[Apollo Server](https://www.apollographql.com/docs/apollo-server/). With the
minimum configuration required, you have a server ready for testing GraphQL
client applications or libraries. Unlike mocking alternatives, graphql-serve
offers persistent data between queries and mutation using in-memory SQLite
database.

## Getting Started

### Installation

Using npm:

```bash
npm install -g graphql-serve
```

or yarn:

```bash
yarn global add graphql-serve
```

### Usage

#### gqlserve

The gqlserve command only needs one or more `*.graphql` data model file(s) in order to setup a working GraphQL server. Here is an example model file:

```graphql
""" @model """
type Note {
  id: ID!
  title: String!
  description: String
  likes: Int
}
```

Assuming you have created your various `*.graphql` data model files in the `models` directory, to automatically generate resolvers and start a GraphQL server listening on port 8080 do the following:

```bash
$ gqlserve serve models --port=8080
```

If you only need to see the generated GraphQL Schema, use the `print-schema` command:

```bash
$ gqlserve print-schema .
```
The above command prints schema generated from data model files in the current directory.

This information is also provided with the command itself:
```bash
$ gqlserve -h
gqlserve <command>

Commands:
  gqlserve print-schema [modelDir]     Generate and print GraphQL schema from data
                                   model files
  gqlserve serve [modelDir] [options]  Generate and start GraphQL server from data
                                   model files

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```
For the `serve` command:
```bash
$ gqlserve serve -h
gqlserve serve [modelDir] [options]

Generate and start GraphQL server from data model files

Positionals:
  modelDir, model  Directory to search for data models                  [string]

Options:
  --port, -p        Specify the port on which to listen on              [number]
  --datasync, --ds  Enable datasynchronization features                [boolean]
  -h, --help        Show help                                          [boolean]
  -v, --version     Show version number                                [boolean]

Examples:
  gqlserve serve . -p 8080  generate schema from data model files in current
                            directory and start GraphQL server on port 8080
```

Also for `print-schema` command:
```bash
$ gqlserve print-schema -h
gqlserve print-schema [modelDir]

Generate and print GraphQL schema from data model files

Positionals:
  modelDir, model  Directory to search for data models                  [string]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Examples:
  gqlserve print-schema modelDir  only display generated schema from data model
                              files in modelDir directory and quit
```

Under to hood we use Graphback to parse the Type Definitions/Data Model and
generate the GraphQL schema and resolvers. See the
[Graphback Docs on Data Model Definition](https://graphback.dev/docs/datamodel) and 
[Data Synchronization](https://graphback.dev/docs/next/datasync/datasync-intro) for data synchronization
features.

## Extension to GraphQL TestX

GraphQL serve is based on GraphQL-TestX:
https://github.com/aerogear/graphql-testx
