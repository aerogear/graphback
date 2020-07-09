---
id: graphqlserve
title: Running an API without code
sidebar_label: API without code
---

With GraphQL Serve you can have a GraphQL API running in just a few seconds without writing a single line of code - all you need is a data model `.graphql` file.

GraphQL Serve is a CLI tool that leverages the power of Graphback to generate a codeless Node.js GraphQL API complete with schema and CRUD resolvers and a MongoDB database in-memory.

## Installation

You can install `graphql-serve` globally with npm:

```
npm i -g graphql-serve
```

## Usage

The bare minimum you need is a GraphQL file with your data models. Create a file called `Note.graphql` and add the following:

```graphql
""" @model """
type Note {
  id: ID!
  title: String!
  description: String
  likes: Int
}
```

The `@model` annotation indicates that `Note` is a data model and Graphback will generate resolvers, a CRUD service and data source for it. You can learn how to build more complex data models in [Data Model](./datamodel).

### Running your codeless GraphQL server

To start your server, run the following command from the same directory as `Note.graphql`:

```bash
gqlserve serve .
```

This will start a GraphQL server on a random port using the data models we just added.

You can customise the directory of the data models:

```bash
gqlserve serve ./path/to/models
```

You can also specify where to load the data models from with a Glob pattern:

```bash
gqlserve print-schema ./schema/**/*.graphql
```

You can specify which port to start the server on:

```bash
$ gqlserve serve ./path/to/models --port 8080

Starting server...

Listening at: http://localhost:8080/graphql
```

### Printing your GraphQL schema

Graphback receives your data models as an input and processes them to generate a GraphQL schema complete with additional types, queries, mutations and subscriptions.

GraphQL Serve allows you to print the resulting schema in your terminal with the `print-schema` subcommand:

```bash
$ gqlserve print-schema ./path/to/models
Generated schema:

...
```