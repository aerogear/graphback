const { createApolloSchema } = require("../libs/createApolloSchema");
const { ApolloServer } = require("apollo-server-koa");

const app = new (require("koa"))();
const schema = createApolloSchema();
const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app });

app.listen({ port: 29128 }, () => {
  console.log(`🚀  Server ready at http://localhost:29128/graphql`);
});
