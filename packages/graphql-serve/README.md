## Graphback

<p align="center">
  <img width="400" src="https://github.com/aerogear/graphback/raw/master/website/static/img/graphback.png">
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

```
npm install -g graphql-serve
```

or yarn:

```
yarn add graphql-serve
```

### Usage


### gqlserve

The gqlserve command needs at least a single `{putAnythingHere}.graphql` data model file in order to setup a working GraphQL server. Here is an example model file:

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

For npm:
```
$ gqlserve --model=models --port=8080
```

For yarn:
```
$ yarn gqlserve --model=models --port=8080
```

This information is also provided with the command itself:
```
$ gqlserve --help
Usage: gqlserve [options]

Options:
  --version    Show version number                                     [boolean]
  --model, -m  Specify the models directory                             [string]
  --port, -p   Specify the port on which to listen on                   [number]
  -h, --help   Show help                                               [boolean]

Examples:
  gqlserve --model=model  generate schema from models in the model directory
  gqlserve --port=8000    server listens on port 8000
```

Under to hood we use Graphback to parse the Type Definitions/Data Model and
generate the GraphQL schema and resolvers. See the
[Graphback Docs on Data Model Definition](https://graphback.dev/docs/datamodel)


### printSchema

The printSchema command prints what the generated GraphQL Schema of the server would look like.

The `--model` argument works the same way here:

```
$ printSchema --model=models
```
Also:

```
$ printSchema --help
Usage: printSchema [options]

Options:
  --version    Show version number                                     [boolean]
  --model, -m  Specify the models directory                             [string]
  -h, --help   Show help                                               [boolean]

Examples:
  printSchema --model=model  generate schema from models in the model directory
```

## Extension to GraphQL TestX

GraphQL serve is based on GraphQL-TestX:
https://github.com/aerogear/graphql-testx
