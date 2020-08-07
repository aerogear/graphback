const { createApolloSchema } = require("../libs/createApolloSchema");
const { ApolloServer } = require("apollo-server-fastify");

const app = require("fastify")();

const schema = createApolloSchema();

const server = new ApolloServer({
  schema,
});

app.register(server.createHandler());

app.listen({ port: 29128 }, () => {
  console.log(`🚀  Server ready at http://localhost:29128/graphql`);
});
