const { buildGraphbackAPI } = require("graphback");
const InMemoryDataProvider = require("../libs/inmemory-data-provider");
const { ApolloServer } = require("apollo-server-fastify");
const { genSchema } = require("../libs/genSchema.js");
const app = require("fastify")();

const db = new InMemoryDataProvider();

const userModel = genSchema(1);

// Use the dataProvider in buildGraphbackAPI
const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(userModel, {
  dataProviderCreator: () => db,
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextCreator,
});

app.register(apolloServer.createHandler());

app.listen({ port: 29128 }, () => {
  console.log(`🚀  Server ready at http://localhost:29128/graphql`);
});
