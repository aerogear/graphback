export const resolvers = {
  Query: {
      hello: (obj: any, args: any, context: any, info: any) => {
          // we can access the request object provided by the Voyager framework

          // we can access the context added below also
          // console.log(context.serverName)
          return `Hello world from graphback`;
      }
  }
}