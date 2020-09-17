# Graphback React Sample application

A starter template for React while using one of the Graphback backend templates.

## Quickstart Guide

This project has been created using Graphback.
Run the project using the following steps:

- Install

```bash
yarn install
```

- Start React App

```bash
yarn start:client
```

## Dependencies:

The following tools and technologies have been used to create this template:

\*GraphQL : GraphQL is an open-source data query and manipulation language for APIs which was publically released by Facebook in 2015.

\*Apollo Client : Apollo Client provides a neat abstraction layer and an interface to interact with the GraphQL server. It allows easier building of UI components that fetch data via GraphQL.

\*Material UI: Material-UI is an open-source project that features React components that implement Google's Material Design. It has been used for styling this sample React template.

## Project structure

The project contains the following set of source files.

- The `.graphlrc.yml` file defining the configuration like the path to business model declaration, how to perform code generation from the GraphQL types to Typescript types etc. The configuration file is defined using the GraphQL project using [`graphql-config`](https://graphql-config.com/introduction).
- A `public` folder which contains static files.
- A `src` folder which has:
  - A `components` folder defining react components for each type of business model.
  - A `graphql` folder which contains a generated `graphback.graphql` using the [generate command](#development-and-adjustment-to-schema-changes) and a custom `getDraftNotes.graphql`. You can add additional custom GraphQL files according to your needs.
  - A `generated-types.tsx` file, which is also generated as indicated by its name. See [Generating types](#development-and-adjustment-to-schema-changes)
  - The rest of the files are to initialize a standard ReactJs Progressive Web App.

> NOTE: All the files can be edited according to your needs except for those that are generated (no need to edit them as they'll be re-generated anyway).

## Development and adjustment to schema changes

The client is designed to work only with the sample schema.
When changing the graphback schema you will need to recompile all the changes.

- Generate React components

```
yarn generate
```

> NOTE: You have to run the above commands on each modification of your business model on the server-side. This ensures that the client is kept in sync with changes on the server-side.
