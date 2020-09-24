---
id: graphqlserve
title: Running an API without code
sidebar_label: API without code
---

With GraphQL Serve you can have a full featured [GraphQL CRUD](https://graphqlcrud.org/) API with subscriptions and data synchronization running in just a few seconds without writing a single line of code - all you need is a data model `.graphql` file.

GraphQL Serve is a CLI tool that leverages the power of Graphback to generate a codeless Node.js GraphQL API complete with schema and CRUD resolvers and an in-memory MongoDB database. 

## Installation

You can install `graphql-serve` globally with npm:

```bash
npm i -g graphql-serve
```

or with yarn:

```bash
yarn global add graphql-serve
```

or run it with [npx](https://www.npmjs.com/package/npx): 

```bash
npx graphql-serve
```

## Usage

The bare minimum you need is a GraphQL file with your data models. Create a file called `Note.graphql` and add the following:

```graphql
""" @model """
type Note {
  _id: GraphbackObjectID!
  title: String!
  description: String
  likes: Int
}

scalar GraphbackObjectID
```

The `@model` annotation indicates that `Note` is a data model and Graphback will generate resolvers, a CRUD service and data source for it. You can learn how to build more complex data models in [Data Model](../model/datamodel#model).

### Running your codeless GraphQL server

To start your server, run the following command from the same directory as `Note.graphql`:

```bash
gqlserve serve Note.graphql
```

This will start a GraphQL server on a random port using the `Note.graphql` data models we just added.

You can customise the directory of the data models:

```bash
gqlserve serve ./path/to/models
```

You can also specify where to load the data models from with a Glob pattern:

```bash
gqlserve serve ./schema/**/*.graphql
```

You can specify which port to start the server on:

```bash
$ gqlserve serve ./path/to/models --port 8080

Starting server...

Listening at: http://localhost:8080/graphql
```

### CRUD

GraphQL Serve creates an in-memory CRUD API to give you queries, mutations and subscriptions for all your models using API patterns from [GraphQLCRUD](https://graphqlcrud.org).

Visit the [CRUD section](../crud/overview) for an overview of the CRUD specification and guides on how to perform CRUD operations on your data.

### Enable Data Synchronization

GraphQL Serve can also operate on data sync models. Under the hood this uses the [Data Sync](../datasync/intro) package. 
To enable data synchronization, all we need to do is enable datasync capabilities on our models via the `@datasync` annotation.

For the `Note` model defined above, this would look like: 

```graphql
""" 
@model
@datasync 
"""
type Note {
  _id: GraphbackObjectID!
  title: String!
  description: String
  likes: Int
}

scalar GraphbackObjectID
```

Once we have a model with datasync capabilities, we can run our GraphQL server by enabling data synchronization as shown below:

```bash
gqlserve serve Note.graphql --datasync
```

Conflict resolution strategies for datasync enabled models can be specified via the --conflict option:

```bash
gqlserve serve Note.graphql --datasync --conflict=clientSideWins
```

This defaults to ClientSideWins, if unset.

The TTL for delta tables, can also be set using the --deltaTTL option:
```bash
gqlserve serve Note.graphql --datasync --deltaTTL=172800
```

This value defaults to `172800` when unused
 
### Printing your GraphQL schema

Graphback receives your data models as an input and processes them to generate a GraphQL schema complete with additional types, queries, mutations and subscriptions.

GraphQL Serve allows you to print the resulting schema in your terminal with the `print-schema` subcommand:

```bash
$ gqlserve print-schema ./path/to/models
Generated schema:

...
```

### Usage Information

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
