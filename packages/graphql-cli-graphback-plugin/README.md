# Graphql-cli-graphback-plugin
Plugin to enable generating fully functional backend 
using GraphQL-Cli

> *NOTE*: This package is no longer maintained. Please use [Graphql CLI](https://github.com/Urigo/graphql-cli) directly.

**Documentation**: [https://graphback.dev](https://graphback.dev)
**Repository**: [https://github.com/aerogear/graphback/](https://github.com/aerogear/graphback/)

## Command line tool

Command line tool is basing on Graphback project.
Graphback is a CLI tool that can help you bootstrap a GraphQL server and client for you including GraphQL schema, resolvers and generating database structure. Graphback addresses the difficulty in configuring a GraphQL server from scratch.

## Installation

Install `graphql-cli` using
```
npm i -g graphql-cli
```

Install the plugin using
```
npm i -g graphql-cli-graphback-plugin
```
## Usage

Installing the plugin exposes the [commands](https://graphback.dev/docs/commands) of Graphback. All the commands are prefixed with `backend-`. For example `graphql backend-init`.

### `graphql backend-init`
The command will guide you through a series of questions - choosing a template, bootstraping model, selecting preferred database - and setup your project for you.

```
graphql backend-init <project name>
```

### `graphql backend-generate`
The command will generate schema and resolvers, with CRUD operations according to your GraphQL data model. 

### `graphql backend-db`
The command will create database resources according to your datamodel(including tables and relationships). Running the commands recreates the database structure i.e. drops all existing data.

You can run created server using `npm run start`
