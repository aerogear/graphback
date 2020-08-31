## Graphback Apollo+MongoDB Data Synchronization Runtime Template

Template showcases Graphback Data Synchronization capabilities using
resolver layer created in-memory as opposed to codegeneration.

Serverless example can be built as docker image with configurable volume for models. 
This models will be processed at application startup giving fully featured GraphQL Server 
following [GraphQL CRUD specification.](https://graphqlcrud.org/)

For more information please refer to: 

### Running example

The project has been created using [`Graphback`](https://graphback.dev/). Run the project using the following steps.

- Start the database

```
docker-compose up -d
```

- Define your schema in the `model/datamodel.graphql` file. Or use the default:

```graphql
"""
@model
@datasync
"""
type Note {
  _id: GraphbackObjectID!
  title: String!
  description: String
  """
  @oneToMany(field: 'note')
  """
  comments: [Comment]!
}

""" 
@model
@datasync
"""
type Comment {
  _id: GraphbackObjectID!
  text: String
  description: String
}

scalar GraphbackObjectID
```

- Start the server

```
npm run develop
```

Or, if using yarn

```
yarn develop
```

For more on customising your Graphback application, check out [our docs](https://graphback.dev/docs/gettingstarted)

If your project contains client application please follow `./client/README.md` for running client side application
