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
    const backend = new GraphQLBackendCreator(`your model string here`, {});
    const dbClientProvider = new PgKnexDBDataProvider(client);
    const runtime = await backend.createRuntime(dbClientProvider, pubSub);
    console.log(runtime.schema,  runtime.resolvers)
```    

See: `./runtime.ts` for fully functional example.


### Running example

The project has been created using `graphback`. Run the project using the following steps. 
- Start the database
```
docker-compose up -d
```

- create database (Data migration will be supported later by @craicoverflow)
```
graphback db
```
- Start the server
```
npm start
```

Enjoy runtime app