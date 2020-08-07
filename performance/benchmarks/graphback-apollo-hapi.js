const { buildGraphbackAPI } = require("graphback");
const InMemoryDataProvider = require("../libs/inmemory-data-provider");
const { ApolloServer } = require("apollo-server-hapi");
const { genSchema } = require("../libs/genSchema.js");
const Hapi = require("hapi");

const app = new Hapi.server({
  host: "localhost",
  port: 29128,
});

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

apolloServer.applyMiddleware({ app });

app.start().then(console.log).catch(console.error);
