---
id: queries
title: Queries
sidebar_label: Queries
---

Graphback provides two query types for every model in the schema.

- [`find<Type>s`](#find): fetch all or a subset of items through optional filtering, pagination and sorting.
- [`get<Type>`](#get): fetch a single item by its unique ID.

## Find

The `find` operation allows the client to fetch multiple items from the database, with optional filtering, pagination and ordering of the data allowing you to specify exactly the data you need. 

The query follows the naming format `find<Type>s`:

```graphql
type Query {
  findNotes(filter: NoteFilter, page: PageRequest, orderBy: OrderByInput): NoteResultList!
}
```

**Arguments:**

- `filter`: filter object to query specific data.
- `page`: enables pagination of the data.
- `orderBy`: sorts the data in ascending or descending order.

The items fetched by `findNote` are returned in a container type `NoteResultList` created by Graphback:

```graphql
type NoteResultList {
  # The notes are returned in the items field
  items: [Note]!
  # Offset specified in query
  offset: Int
  # Offset specified in query
  limit: Int
  # total count of notes in the database
  count: Int
}
```

Example of a simple query to retrieve all notes:

```graphql
query {
  findNotes {
    items {
      id
      title
      likes
    }
  }
}
```

### Filtering

Graphback generates all the appropriate schema elements from [GraphQLCRUD](https://graphqlcrud.org) and provides a mapping implementation for both PostgreSQL and MongoDB.
This lets you perform simple or complex querying of your data directly from GraphQL queries.

Take an example `Note` model, which uses each of the built-in scalar types: `ID`, `String`, `Boolean`, `Int`, `Float`.

```graphql
""" @model """
type Note {
  id: ID!
  title: String!
  opened: Boolean
  likes: Int
  completedPercentage: Float
}
```

Graphback generates a filter input type for each model in the schema.

```graphql
input NoteFilter {
  id: IDInput
  title: StringInput
  opened: BooleanInput
  likes: IntInput
  completedPercentage: FloatInput
  and: [NoteFilter!]
  or: [NoteFilter!]
  not: NoteFilter
}
```

So you can perform filtering of the data like this:

```graphql
query {
  findNotes(filter: {
    title: {
      contains: "emails"
    },
    opened: {
      eq: false
    },
    likes: {
      gt: 10
    },
    completedPercentage: {
      between: [20, 40]
    },
    and: {
      title: {
        startsWith: "read"
      }
    },
    or: {
      likes: {
        eq: 100 
      }
    },
    not: {
      title: {
        contains: "archived"
      }
    }
  }) {
    items {
      id
      title
      likes
    }
  }
}
```

#### Operators

This is a list of all available filter operators.

| Operator   	| Meaning                      	| Scalars    	|
|------------	|------------------------------	|------------	|
| eq         	| Equal to                     	| All        	|
| ne         	| Not equal to                 	| All        	|
| lt         	| Less than                    	| All        	| 
| le         	| Less than or equal to        	| All        	| 
| gt         	| Greater than                 	| All        	|  
| gt         	| Greater than or equal to     	| All        	|  
| between    	| Between a range (of numbers) 	| Int, Float 	|  
| in         	| In a list of items           	| All        	|  
| contains   	| String contains              	| String     	| 
| startsWith 	| String starts with           	| String     	| 
| endsWith   	| String ends with             	| String     	|

Each field in the `NoteFilter` input maps to a generated scalar input. This specifies the operators available for that scalar.

```graphql
input StringInput {
  ne: String
  eq: String
  le: String
  lt: String
  ge: String
  gt: String
  in: [String!]
  contains: String
  startsWith: String
  endsWith: String
}

input IDInput {
  ne: ID
  eq: ID
  le: ID
  lt: ID
  ge: ID
  gt: ID
  in: [ID!]
}

input IntInput {
  ne: Int
  eq: Int
  le: Int
  lt: Int
  ge: Int
  gt: Int
  in: [Int!]
  between: [Int!]
}

input FloatInput {
  ne: Float
  eq: Float
  le: Float
  lt: Float
  ge: Float
  gt: Float
  in: [Float!]
  between: [Float!]
}

input BooleanInput {
  ne: Boolean
  eq: Boolean
}
```

Graphback generates a filter input for the [Graphback scalars](../model/) too. For convenience, a filter input for `Date`, `DateTime`, `Time`, `Timestamp` scalars is also generated; however we do not officially support these scalars and recommend you to use the Graphback scalars.

### Pagination

You can perform pagination with the `page` argument.

```graphql
type PageRequest {
  limit: Int
  offset: Int
}
```

```graphql
findNotes(page: {limit: 10, offset:4}) {
  items {
    id
  }
}
```

### Ordering

```graphql
input OrderByInput {
  field: String!
  order: SortDirectionEnum = ASC
}

enum SortDirectionEnum {
  DESC
  ASC
}
```

To sort/order items by a certain field, use the `orderBy` argument.

```graphql
findNotes(orderBy: {order: DESC, field: "likes"}) {
  items {
    id
  }
}
```

## Get

The `get` operation allows the client to fetch a single item from the database by its unique ID.

The query follows the naming format `get<Type>`:

```graphql
type Query {
  getNote(id: ID!): Note
}
```

**Arguments:**

- `id`: The unique ID of the object. This will always be `id: ID`. The resolver will automatically map this to your primary key field.

```graphql
"""
@model
"""
type User {
  """@id"""
  email: String
  name: String
}
```

Example of a query to retrieve a single user by their primary field (email):

```graphql
getNote(id: "tommyshelby@gmail.com") {
  id
  email
  name
}
```