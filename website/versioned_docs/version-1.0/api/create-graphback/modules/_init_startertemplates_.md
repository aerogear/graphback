---
id: "_init_startertemplates_"
title: "init/starterTemplates"
sidebar_label: "init/starterTemplates"
---

## Index

### Variables

* [allTemplates](_init_startertemplates_.md#const-alltemplates)

### Functions

* [extractTemplate](_init_startertemplates_.md#extracttemplate)

## Variables

### `Const` allTemplates

• **allTemplates**: *[Template](../interfaces/_init_templatemetadata_.template.md)[]* = [
  {
    name: 'apollo-fullstack-react-postgres-ts',
    description: 'Apollo GraphQL Server connecting to Postgres database and React client using TypeScript',
    repos: [
      {
        uri: 'https://github.com/aerogear/graphback',
        branch: 'templates-1.0.0',
        path: '/templates/ts-react-apollo-client',
        mountpath: "client"
      }, {
        uri: 'https://github.com/aerogear/graphback',
        branch: 'templates-1.0.0',
        path: '/templates/ts-apollo-postgres-backend',
      }]
  },
  {
    name: 'apollo-fullstack-react-mongo-ts',
    description: 'Apollo GraphQL Server connecting to Mongo database and React client using TypeScript',
    repos: [
      {
        uri: 'https://github.com/aerogear/graphback',
        branch: 'templates-1.0.0',
        path: '/templates/ts-react-apollo-client',
        mountpath: "client"
      },{
        uri: 'https://github.com/aerogear/graphback',
        branch: 'templates-1.0.0',
        path: '/templates/ts-apollo-mongodb-backend',
      }]
  },
  {
    name: 'apollo-mongo-server-ts',
    description: 'Apollo GraphQL Server connecting to Mongo database using TypeScript',
    repos: [{
      uri: 'https://github.com/aerogear/graphback',
      branch: 'templates-1.0.0',
      path: '/templates/ts-apollo-mongodb-backend',
    }]
  },
  {
    name: 'apollo-mongo-datasync-server-ts',
    description: 'Apollo GraphQL Server connecting to Mongo database using TypeScript. Contains Data Synchronization features.',
    repos: [{
      uri: 'https://github.com/aerogear/graphback',
      branch: 'templates-1.0.0',
      path: '/templates/ts-apollo-mongodb-datasync-backend',
    }]
  },
  {
    name: 'apollo-postgres-server-ts',
    description: 'Apollo GraphQL Server connecting to Postgres database using TypeScript',
    repos: [{
      uri: 'https://github.com/aerogear/graphback',
      branch: 'templates-1.0.0',
      path: '/templates/ts-apollo-postgres-backend',
    }]
  }
]

*Defined in [init/starterTemplates.ts:13](https://github.com/aerogear/graphback/blob/63664df15/packages/create-graphback/src/init/starterTemplates.ts#L13)*

available templates

## Functions

###  extractTemplate

▸ **extractTemplate**(`template`: [Template](../interfaces/_init_templatemetadata_.template.md), `name`: string): *Promise‹void›*

*Defined in [init/starterTemplates.ts:157](https://github.com/aerogear/graphback/blob/63664df15/packages/create-graphback/src/init/starterTemplates.ts#L157)*

download and extract template from repository into project folder

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`template` | [Template](../interfaces/_init_templatemetadata_.template.md) | template information |
`name` | string | name of project folder  |

**Returns:** *Promise‹void›*
