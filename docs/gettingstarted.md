---
id: gettingstarted
title: What is Graphback
sidebar_label: What is Graphback
---

Graphback is a CLI tool that can help you bootstrap a GraphQL server and client for you including GraphQL schema, resolvers and generating database structure. Graphback addresses the difficulty in configuring a GraphQL server from scratch.

## Installation

```bash
npm i -g graphback-cli
```

## Usage

To start with Graphback run

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

> You can run the development version using `npm run develop`, for available templates of Graphback.
