## Graphback Runtime Template

Template showcases Graphback Runtime (ServerLess) capabilities using
resolver layer created in-memory as opposed to codegeneration.

Serverless example can be build as docker image with configurable volume for models. 
This models will be processed at application at startup giving fully featured GraphQL Server 
following Graphback CRUD specification.

For more information please refer to: 

### Running example using Postgres database

The project has been created using `graphback`. Run the project using the following steps.

- Start the database

```
docker-compose up -d
```

- Define your schema in the `model/runtime.graphql` file. Or use the default:

```
type User {
  id: ID!
  name: String
}
```

- Start the server

```
npm run develop
```

Or, if using yarn

```
yarn develop
```

### Running example using SQLite database

Please change your graphqlrc.yml `dbmigrations` config

```
  dbmigrations:
      client: sqlite3
      connection:
        filename: ":memory:"
```

- Next modify the `runtime.ts` file and use the `GraphbackRuntime` instead of `PGRuntime` class.

- Define your schema in the `model/runtime.graphql` file. Or use the default:

```
type User {
  id: ID!
  name: String
}
```

- Start the server (for the first time)

```
npm run develop
```

Or, if using yarn

```
yarn develop
```

If the server is being re-run, modify the `src/runtime.ts` and comment out the `migrateDb` function, since it will not be possible to re-migrate the database with SQLite3.

Enjoy the runtime app
