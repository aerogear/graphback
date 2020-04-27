---

title: Custom Methods
id: custom
---

Graphback also allows people to add custom queries, mutations or subscriptions by generating empty stubs where users can write their resolvers. This can be done by defining `Query`, `Mutation` or `Subscription` in your data model. The syntax is similar to SDL syntax.

```
type Query {
  ...   //schema definition
}
```
### Example
If we have the following datamodel
```
type Post {
  id: ID!
  content: String!
  author: User!
  likes: Int!
}

type User {
  id: ID!
  name: String!
}
```
and we want to implement a mutation to like a Post, then we can simply
```graphql
...
...

#Custom mutations
type Mutation {
  likePost(id: ID!): Post!
}
```
This will add the mutation to the schema 
```graphql
type Mutation {
  createPost(input: PostInput!): Post!
  createUser(input: UserInput!): User!
  updatePost(id: ID!, input: PostInput!): Post!
  updateUser(id: ID!, input: UserInput!): User!
  ## Custom mutations
  likePost(id: ID!): Post!
}
```
and will generated a resolver file in custom folder
```
export const likePost = {
  Mutation: {
    likePost: (_: any, args: any, context: any) => {
        // Implementation here
    }
  }
}
```

> **Note:** This works similarily for `Query` and `Subscription`.
