---
title: Using Visitor Pattern to parse GraphQL AST
author: Ankit Jena
authorURL: http://twitter.com/ankitjey
authorFBID: 100002617764210
---

GraphQL is a amazing technology which is being adapted more and more. As part of my work for JBoss community in GSoC'19 I have been working on [Graphback](https://aerogear.github.io/graphback). For the needs of the project we had to extract information from a schema (SDL syntax) into a nice object we can use. For example, convert this

<!--truncate-->

```
type User{
  username: String!
  email: String
}
```
to something like
```
{
  name: "User",
  fields: [
    {
      name: "username",
      type: "String",
      isNull: false
    },
    {
      name: "email",
      type: "String",
      isNull: true
    }
  ]
}
```
When schema is read by GraphQL it doesn't store it as a string, it does a lot of parsing to convert it into an AST(will talk more about it).

The best way to do this is using Visitor pattern. In this blog post I'm going to explain how GraphQL converts schema to ASTs and using Visitor Pattern.

## **Abstract Syntax Tree(AST)**

> *When a GraphQL server receives a query to process it generally comes in as a String. This string must be tokenized and parsed into a representation that the machine understands. This representation is called an abstract syntax tree.*

A great tool to inspect abstract syntax trees is [AST Explorer](https://astexplorer.net). The site lets you quickly paste code from JavaScript to PHP to TypeScript and even GraphQL types into the UI and then provides the resulting abstract syntax tree. For the above example, the AST is

```
{
  "kind": "Document",
  "definitions": [
    {
      "kind": "ObjectTypeDefinition",
      "name": {
        "kind": "Name",
        "value": "User",
        "loc": {
          "start": 133,
          "end": 137
        }
      },
      "interfaces": [],
      "directives": [],
      "fields": [
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "username",
            "loc": {
              "start": 141,
              "end": 149
            }
          },
          "arguments": [],
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "String",
                "loc": {
                  "start": 151,
                  "end": 157
                }
              },
              "loc": {
                "start": 151,
                "end": 157
              }
            },
            "loc": {
              "start": 151,
              "end": 158
            }
          },
          "directives": [],
          "loc": {
            "start": 141,
            "end": 158
          }
        },
        {
          "kind": "FieldDefinition",
          "name": {
            "kind": "Name",
            "value": "email",
            "loc": {
              "start": 162,
              "end": 167
            }
          },
          "arguments": [],
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String",
              "loc": {
                "start": 169,
                "end": 175
              }
            },
            "loc": {
              "start": 169,
              "end": 175
            }
          },
          "directives": [],
          "loc": {
            "start": 162,
            "end": 175
          }
        }
      ],
      "loc": {
        "start": 128,
        "end": 177
      }
    }
  ],
  "loc": {
    "start": 0,
    "end": 178
  }
}
```

The AST includes a lot of metadata, such as location in the source, or identifiers, such as argument names; and thanks to this deeply-nested JSON object, we now have all the power we need to work with GraphQL schemas.


## **Visitor Pattern**

> *visit() will walk through an AST using a depth first traversal, calling the visitor's enter function at each node in the traversal, and calling the leave function after visiting that node and all of its child nodes.*

> *By returning different values from the enter and leave functions, the behavior of the visitor can be altered, including skipping over a sub-tree of the AST (by returning false), editing the AST by returning a value or null to remove the value, or to stop the whole traversal by returning BREAK.*

> *&ndash; GraphQL Documentation*

Visit function does a depth first traversal and it calls the `enter` function each time it encounters and node and `leave` function after a node's traversal. When we return a value from a node in the leave function the node is changed to a return value.

Plus we can visit specific nodes we want using Named visitors.

```
visit(ast, {
  leave: {
    Kind(node) {
      // leave the "Kind" node
    }
  }
})
```
That's all we need for parsing the AST. Let's write the code.

For this case, we get to see a few kind of nodes, `ObjectTypeDefinition`, `FieldDefinition`, `NotNullType`, `NamedType` and `Name`. Let's go through them in order from smaller nodes to larger ones to write our visitor. 

```
const visitor = {
  Name: (node) => {
    return node.value
  },
  NamedType: (node) => {
    return {
      "type": node.name,  //returns the value
      "isNull": true
    }
  },
  NonNullType: (node) => {
    return {
      //spread returned object from NamedType
      ...node.type,     
      "isNull": false
    }
  },
  FieldDefinition: (node) => {
    return {
      //spread returned object from NamedType or NotNullType
      ...node.type,     
      "name": node.name
    }
  },
  ObjectTypeDefinition: (node) => {
    return {
      "name": node.name,
      "fields": node.fields
    }
  }
}
```
When we user this in the leave function of visitor. We get our required output in the definitions field of the result.

Now to actually do the visit and get the result.

```
const ast = parse(schemaText)
const result = visit(ast, { leave: visitor })
```

Visitor pattern is really helpful as you can adept it to your use cases. This is one of the few great tools within GraphQL. Hope this helps.

### References
1. [https://graphql.org/graphql-js/language/#visitor](https://graphql.org/graphql-js/language/#visitor)
2. [https://graphql-code-generator.com/docs/custom-codegen/using-visitor](https://graphql-code-generator.com/docs/custom-codegen/using-visitor)
