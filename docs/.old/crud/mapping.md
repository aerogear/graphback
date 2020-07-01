---
id: crudmapping
title: Type to Database mapping
sidebar_label: Mapping your data
---

## Mapping your data

Graphback allows you to map your types to database types by utilizing annotations on the types.
For example:

```graphql
""" @model """
type Note {
  id: ID!
  title: String!
  description: String!
}
```

For more information please refer to [`migrations documentation`](/docs/migrations).
