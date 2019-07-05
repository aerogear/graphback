## What is Graphback?

Graphback is a CLI tool that can help you bootstrap a GraphQL server for you including GraphQL schema, type safe resolvers and generating database structure for you. It addresses the difficulty in configuring a GraphQL server from scratch.

## Installation
```bash
npm i -g graphback-cli
```

## Usage
To start with Graphback run
```bash
graphback init <project-name>
```

Change directory into your project folder. To generate schema and resolvers run 
```bash
graphback generate
``` 

To setup database resources
```bash
docker-compose up -d
graphback db
```

To start the server and watch for changes in your datamodel run
```bash
graphback watch
```

## Commands
### Init
  ```bash
  graphback init <project-name>
  ```
  The command will guide you through a series of questions - choosing a template, bootstraping model - and setup your project for you.

  Example:

  ![](images/init.png)

  You can also provide the template name as argument which will skip the template selection part.
  ```bash
  graphback init <project-name> [template-name]
  ```
### Generate
  ```bash
  graphback generate
  ```
  Generate command will generate schema and resolvers for your GraphQL server based on your datamodel.

### DB
  ```bash
  graphback db
  ```
  Create databases resources based on your datamodel. Currently supports PostgreSQL only
### Watch
  ```bash
  graphback watch
  ```
  Watches for changes in your datamodel and regenerates your schema and resolvers along with modifying your database.