---

title: What is Graphback and how do I get started?
sidebar_label: What is Graphback
id: gettingstarted
---

Graphback is a CLI tool that can help you bootstrap a GraphQL server and client for you including GraphQL schema, resolvers and generating database structure. Graphback addresses the difficulty in configuring a GraphQL server from scratch.

## Quick Start: Installing and running Graphback
```bash
npm i -g graphback-cli
graphback init <project-name>
```
Follow the onscreen instructions.

You can use Graphback with either a SQLite (for prototyping) or PostgreSQL (for production) databases.

If you use SQLite, you don't need to use Docker.

## Creating a GraphQL server and client with SQLite

Create a GraphQL project:
```bash
graphback init <project-name>
```

Change directory into your project folder. Edit your [`datamodel`](/docs/datamodel) file inside the `model` folder. To generate schema and resolvers run 
```bash
graphback generate
``` 

You can now edit the `db.sqlite` file in the project root directory using a SQLite client. 

Start the developer server by running:

```bash
npm run develop
```

## Creating a GraphQL server and client using PostreSQL


Create a GraphQL project:
```bash
graphback init <project-name>
```

Change directory into your project folder. Edit your [`datamodel`](/docs/datamodel) file inside the `model` folder. To generate schema and resolvers run 
```bash
graphback generate
``` 

To setup database resources and start required services
```bash
docker-compose up -d
graphback db
```

To compile the TypeScript code and start the server
```bash
npm run build
npm run start
```

> You can run the development version using `npm run develop`, for available templates of graphback.