const { buildGraphbackAPI } = require("graphback");
const app = require("express")();
const { ApolloServer } = require("apollo-server-express");
const { genSchema } = require("../libs/genSchema.js");
const InMemoryDataProvider = require("../libs/inmemory-data-provider");
const http = require("http");

const db = new InMemoryDataProvider();

const userModel = genSchema(10);

// Use the dataProvider in buildGraphbackAPI
const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(userModel, {
  dataProviderCreator: () => db,
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextCreator,
});

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 29128 }, () => {
  console.log(`🚀  Server ready at http://localhost:29128/graphql`);
});
