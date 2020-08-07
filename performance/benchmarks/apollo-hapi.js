const { createApolloSchema } = require("../libs/createApolloSchema");
const { ApolloServer } = require("apollo-server-hapi");

const Hapi = require("hapi");
const app = new Hapi.server({
  host: "localhost",
  port: 29128,
});

const schema = createApolloSchema();
const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app });
app.start().then(console.log).catch(console.error);
