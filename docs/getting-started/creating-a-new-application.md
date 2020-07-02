---
id: create-new-app
title: Creating a new application
sidebar_label: Create a new application
---

## Prerequisites

Before you start, check to make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) v10.15.x or later
- [npm](https://www.npmjs.com/) v5.x or later

## Create your application

[Create GraphQL](https://github.com/aerogear/create-graphql) is a command-line utility for creating Graphback applications.

Installing with npm:

```sh
npm install -g create-graphql
```

Next, create a Graphback application:

```sh
create-graphql my-awesome-project
```

The CLI will ask you to pick from one of a number of templates. Once chosen, the template will be downloaded to your computer.

Change into your project folder:

```sh
cd my-awesome-project
```

Install dependencies with yarn (or npm):

```sh
yarn install
```

The project will have a GraphQL schema file with some example types which you will likely want to change. Learn how to [design your data models](../model/your-model).

Each template will be different, so you should follow the guide in your new project's README to complete the setup.