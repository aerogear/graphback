---
id: gettingstarted
title: What is Graphback and how do I get started?
sidebar_label: What is Graphback
---

Graphback is an package andCLI tool that can help you bootstrap a GraphQL server and client for you including GraphQL schema, resolvers and generating database structure. Graphback addresses the difficulty in configuring a GraphQL server from scratch by giving developers:

- Generated GraphQL Schema containing Queries and Mutations for general data access
- Underlying resolvers to fetch data in performant way
- Support for subscriptions and live updates on the data
- Relational support
- Database migrations 
- Extendable runtime layer for composing data services used in generated resolvers
- Generated client side queries 

## Getting started using GraphQL CLI

You can use any of the available GraphQL-CLI templates to bootstrap Graphback enabled project. 


With yarn:
```
yarn global add graphql-cli@canary
```

With npm:
```
npm install -g graphql-cli@canary
```

Execute init command to create project from scratch

```
graphql init
```

Please answer all questions.
After project is created please follow project README file that might differ depending on
the template tha was choosen on startup.

GraphQL CLI offers various commands to interact with your project that work along Graphback package.
Graphback specific commands are available by executing `graphql generate` 
 
## Adding Graphback to existing project using Graphback CLI

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

Navigate to your project root and execute:

```bash
graphback config <project-name>
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