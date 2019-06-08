import gql from "graphql-tag";


// FIXME - those are just examples to compile project
/**
 * This file connects to
 */
export const typeDefs = gql`
type Query {
  hello: String
}
`;

// Resolver functions. This is our business logic
export const resolvers = {
    Query: {
        hello: (obj, args, context, info) => {
            // we can access the request object provided by the Voyager framework

            // we can access the context added below also
            // console.log(context.serverName)
            return `Hello world from ${context.serverName}`;
        }
    }
}
