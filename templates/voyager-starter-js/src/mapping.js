const gql = require('graphql-tag')


// FIXME - those are just examples to compile project
/**
 * This file connects to 
 */
const typeDefs = gql`
type Query {
  hello: String
}
`

// Resolver functions. This is our business logic
const resolvers = {
    Query: {
        hello: (obj, args, context, info) => {
            // we can access the request object provided by the Voyager framework
            console.log(context.request.body)

            // we can access the context added below also
            console.log(context.serverName)
            return `Hello world from ${context.serverName}`
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}
