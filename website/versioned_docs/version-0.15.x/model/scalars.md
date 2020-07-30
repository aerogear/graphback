---
id: scalars
title: Graphback Scalars
sidebar_label: Graphback Scalars
---

Graphback supports common used [`Int`, `Float`, `String`, `Boolean`, `ID` GraphQL scalars](https://graphql.org/learn/schema/#scalar-types) types. On top of these scalars, Graphback goes a step further by bringing in support of [additional integration of scalar types](#table-summary) making writing modern applications easy. This integration, offers 
- Out of the box proven scalar resolvers thanks to [GraphQL Scalars](https://www.npmjs.com/package/graphql-scalars) library. 
- Generation of the required input types for filtering except for `GraphbackJSONObject` and `GraphbackJSON`.   
- Automatic inferring of the required underlying database when using the [GraphQL Migrations](../graphql-migrations/intro.md) package.

The table below shows the scalar types that Graphback supports out of the box.

## Table Summary

| Scalar | Description | Database Type |
| ------------- |---------------| ------ |
| `GraphbackTime` | A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.| `time` |
| `GraphbackDate` | A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. | `date` |
| `GraphbackDateTime` | A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.| `datetime` |
| `GraphbackObjectID` | A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. You will need to have the [`mongodb`](https://www.npmjs.com/package/mongodb) package installed in order to use this| `varchar(24)` |
| `GraphbackJSONObject` | The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). | `json` |
| `GraphbackJSON` | The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).| `json` |
| `GraphbackTimestamp` | The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch.| `timestamp` |

:::note
To be able to use either of those scalars, they will need to be defined in your [Graphback Business Model](./datamodel.md) file as shown in the example below.
:::

:::info
Custom scalar types will need to be specified as you normally would i.e specifying the scalar in the model and configuring the corresponding resolvers.
:::

## Example Usage

Take an example `Note` model, which uses each of the scalar types: `ID`, `String`, `GraphbackDateTime`. 

```graphql
// highlight-start
# Graphback DateTime scalar.
scalar GraphbackDateTime
// highlight-end

""" @model """
type Note {
  id: ID!
  title: String!
  // highlight-start
  """
  Usage of the Graphback DateTime scalar
  """
  createdAt: GraphbackDateTime
  // highlight-end
}
```

The highlighted code shows how you can define and use one of the Graphback scalars.

Graphback generates a filter input type for each model in the schema.

```graphql {4}
input NoteFilter {
  id: IDInput
  title: StringInput
  createdAt: GraphbackDateTimeInput
  and: [NoteFilter!]
  or: [NoteFilter!]
  not: NoteFilter
}
```

With the generated `GraphbackDateTimeInput` having the following fields:

```graphql
input GraphbackDateTimeInput {
  ne: GraphbackDateTime
  eq: GraphbackDateTime
  le: GraphbackDateTime
  lt: GraphbackDateTime
  ge: GraphbackDateTime
  gt: GraphbackDateTime
  in: [GraphbackDateTime!]
  between: [GraphbackDateTime!]
}
```

So you can perform filtering of the data like this to retrive notes created after `2020-07-27T12:11:41.288Z`:

```graphql
query {
  findNotes(filter: {
    createdAt: {
      gt: "2020-07-27T12:11:41.288Z"
    }
  }) {
    items {
      id
      title
      createdAt
    }
  }
}
```