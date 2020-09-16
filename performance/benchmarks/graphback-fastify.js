const fastify = require('fastify')
const fastifyGQL = require('fastify-gql')
const { buildGraphbackAPI } = require("graphback");
const { genSchema } = require("../libs/genSchema.js");
const fastifyHealthCheck = require('fastify-healthcheck');
const InMemoryDataProvider = require("../libs/inmemory-data-provider");

const app = fastify();
const userModel = genSchema(1);
const db = new InMemoryDataProvider();

// Use the dataProvider in buildGraphbackAPI
const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(userModel, {
  dataProviderCreator: () => db,
});

app.register(fastifyGQL, {
  schema: typeDefs,
  resolvers,
  context: contextCreator
})

app.register(fastifyHealthCheck, {healthcheckUrl: '/.well-known/apollo/server-health'}); // hack to accomodate apollo server healthcheck https://www.apollographql.com/docs/apollo-server/monitoring/health-checks/

app.listen(29128, () => {
  console.log(`🚀  Server ready at http://localhost:29128/graphql`);
});
