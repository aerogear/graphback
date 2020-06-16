---
id: metadata
title: Graphback Supported Metadata
sidebar_label: Metadata Reference
---

Graphback uses `graphql-metadata` for model transformations at runtime.
<!-- TODO: Why was metadata chosen over directives -->

Below is a list of annotations supported by Graphback:

### `@model`

The `@model` annotation is at the core of the Graphback's model definition syntax. It tells Graphback if a type should be considered part of the data model i.e. a table in a relational database or a collection in MongoDB.

It also tells Graphback about what queries and mutations it needs to generate for a type. For Graphback to autogenerate type definitions and resolvers, there must be at least one type annotated with `@model`.

#### Arguments

| Argument Key | Description | Example |
|-|-|-|
| `create` | Optionally specifies whether a `create` mutation is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(create: false)` |
| `delete` | Optionally specifies whether a `delete` mutation is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(delete: true)` |
| `find` | Optionally specifies whether a `find` query is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(find: false)` |
| `findOne` | Optionally specifies whether a `findOne` query is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(findOne: false)` |
| `subCreate` | Optionally specifies whether a `new` subscription is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(subCreate: false)` |
| `subUpdate` | Optionally specifies whether an `updated` subscription is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(subUpdate: false)` |
| `subDelete` | Optionally specifies whether a `deleted` subscription is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(subDelete: false)` |

#### Example

With the following example data model:

```graphql
"""
@model(
    delete: false
)
"""
type Comment {
  id: ID!
  text: String
  description: String
}
```

Graphback generates the following queries, mutations and subscriptions:
```graphql
type Mutation {
  createComment(input: CreateCommentInput!): Comment!
  updateComment(input: MutateCommentInput!): Comment!
}

type Query {
  getComment(id: ID!): Comment
  findComments(
    filter: CommentFilter
    page: PageRequest
    orderBy: OrderByInput
  ): CommentResultList!
}

type Subscription {
  newComment(filter: CommentSubscriptionFilter): Comment!
  updatedComment(filter: CommentSubscriptionFilter): Comment!
}

```

It is apparent that the `comment` type does not have a `delete` mutation or a `deleted` subscription.

### `@versioned`

The `versioned` annotation adds two fields to a model: `updatedAt` and `createdAt` which are then automatically managed by graphback. This annotation is **only** supported by the MongoDB data source as of now.

#### Example

From following example data model:

```graphql
"""
@model
@versioned
"""
type Comment {
  id: ID!
  text: String
  description: String
}
```

Graphback autogenerates the following:

```graphql
type Comment {
  id: ID!
  text: String
  description: String
  note: Note
  createdAt: String
  updatedAt: String
}
```