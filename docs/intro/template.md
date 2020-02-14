---
id: template
title: Create client and server application from template
sidebar_label: Init from Boilerplate
---

### Start new project using Graphback and GraphQL CLI

The best way to start with Graphback is to choose one of the project boilerplates 
available as part of official GraphQL CLI. 
GraphQL CLI is an very poular command line tool that integrates Graphback and 
other community libraries offering a comprehensive way to work with GraphQL APIs.
You can use any of the available GraphQL CLI templates to bootstrap Graphback enabled project. 

### Procedure

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

Please answer all questions based on your preference.
After project is created please follow project README file that might differ depending on
the template that was chosen on startup.

GraphQL CLI offers various commands to interact with your project that work with the Graphback package.
Graphback specific commands are available by executing `graphql generate`.
 
