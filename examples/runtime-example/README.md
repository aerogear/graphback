## apollo-starter-ts

Template that showcases Graphback runtime generation capabilities using 
resolver layer generated in memory. 

### Example 

To use runtime capabilities developers will need to create data provider.
Currently 2 data providers are supported:

 - KnexDBDataProvider
 - PgKnexDBDataProvider
 - RestDataProvider (Looking for contributions)

Then developers can create runtime instance:

```ts
    const client = new Knex(...);
    const graphbackOptions = {...}
    const modelString = `type Test ...`
    
    // Create backend
    const backend = new GraphQLBackendCreator(modelString, graphbackOptions);
    const dbClientProvider = new PgKnexDBDataProvider(client);
    const runtime = await backend.createRuntime(dbClientProvider);
    console.log(runtime.schema,  runtime.resolvers)
```    

See [`./runtime.ts`](https://github.com/aerogear/graphback/blob/master/example/runtime/src/runtime.ts#L30) for a fully functional example.

### Running example

The project has been created using `graphback`. Run the project using the following steps. 
- Start the database
```
docker-compose up -d
```

- create database
```
graphback db
```
- Start the server
```
npm start
```

Enjoy runtime app