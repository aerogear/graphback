const { gql } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const InMemoryDataProvider = require("./inmemory-data-provider");

const db = new InMemoryDataProvider();

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    md5: String!
    company: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    name: String!
    numPages: Int!
  }

  input BookInput {
    id: ID!
    name: String!
    numPages: Int!
  }

  input CreateAuthorInput {
    name: String!
    md5: String!
    company: String!
    books: [BookInput!]!
  }

  type Mutation {
    createAuthor1(input: CreateAuthorInput!): Author
  }

  type Query {
    findAuthor1s: AuthorResult
  }

  type AuthorResult {
    items: [Author!]!
  }
`;

const asyncResolvers = {
  Query: {
    findAuthor1s: async (_, args, context, info) => {
      return {
        items: await db.findBy(args.filter, context),
      };
    },
  },
  Mutation: {
    createAuthor1: async (_, args, context, info) => {
      return await db.create(args.input, context);
    },
  },
};

module.exports.createApolloSchema = () => {
  return makeExecutableSchema({
    typeDefs,
    resolvers: asyncResolvers,
  });
};
