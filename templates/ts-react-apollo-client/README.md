# Graphback React Sample application

Starter React template using one of the Graphback backend templates


## Project structure

The project contains the following set of source files. 

* The `.graphlrc.yml` file defining the configuration like the path to business model declaration, how to peform code generation from the GraphQL types to Typescript types etc. The configuration file is defined using the GraphQL project using [`graphql-config`](https://graphql-config.com/introduction).
* A `public` folder which contains static files.
* A `src` folder which has:
  * A `components` folder defining react components for each type of your business model. 
  * A `graphql` folder which contains a generated `graphback.graphql` using the [generate command](#development-and-adjustment-to-schema-changes) and a custom `getDraftNotes.graphql`. You can add additional custom GraphQL files according to your needs.  
  * A `generated-types.tsx` file, which is also generated as indicated by its name. See [Generating types](#development-and-adjustment-to-schema-changes)
  * The rest of the files are to initialise a standard ReactJs Progressive Web App.
   
> NOTE: All the files can be edited according to your needs except for those that are generated (no need to edit them as they'll be re-generated anyway).  
 

## Usage

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

## Development and adjustment to schema changes

Client is designed to work only with the sample schema.
When changing graphback schema you will need to recompile all the changes.

- Generate React components

```
yarn generate
```

> NOTE: You have to run the above commands on each modification of your business model in the server side. This ensure that the client is kept in sync with changes on the server side. 