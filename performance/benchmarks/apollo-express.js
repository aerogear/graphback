const { createApolloSchema } = require("../libs/createApolloSchema");
const { ApolloServer } = require("apollo-server-express");

const app = require("express")();

const schema = createApolloSchema();
const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app });

app.listen(29128);
