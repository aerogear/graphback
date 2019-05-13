## Getting Started

1) Create GraphQL schema
```graphql
const exampleDefinition = 
    type Note {
        title: String!
        description: String!
    }
```

2) Configure generator

```typescript
const backendGenerator = new GraphQLBackend(exampleDefinition);
```

3) Generate resources

```typescript
backend.createBackend().then((generated: IGraphQLBackend) => {
  console.log(generated)
});
```

See [example](https://github.com/graphql-heroes/graphql-backend-gen/tree/master/example/index.ts) for more advanced use case.

## Database Relationships

All types of database relationships - `1:1, 1:m and n:m` - are supported by the generator.

The `1:1` relation can be simply declared by:
```graphql
type Profile {
  user: User!
}
```
which will create the relationship via a column in the `user` table using column `profileId`. You can customize the field which tracks the relationship using directives.
```graphql
type Profile {
  user: User! @OneToOne(field: "yourCustomField")
}
```

The `1:m` relation is declared with array syntax.
```graphql
type Note {
  comment: [Comment!]!
}
```
This creates a column `noteId` in table `comment` to track the relationship. You can similarily customize the column name as follows:
```graphql
type Note {
  comment: [Comment!]! @OneToMany(field: "yourCustomField")
}
```

The `n:m` relation requires you to define it using directives as default.
```graphql
type Note {
  users: [User!]! @ManyToMany //array syntax required  
}
```
This will create a separate table `user_note` to track the relationship using columns `userId` and `noteId`. You can customize the table name as such:
```graphql
type Note {
  users: [User!]! @ManyToMany(tablename: "yourCustomTable")  
}
```
See [tests](https://github.com/graphql-heroes/graphql-backend-gen/tree/master/tests) for use cases and tests on relations.
