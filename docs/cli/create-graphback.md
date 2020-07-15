---
id: create-graphback
title: Create Graphback
sidebar_label: Create Graphback
---

[Create Graphback](https://www.npmjs.com/package/create-graphback) is a command-line utility for creating Graphback applications.

## Usage
You can initialise a Graphback project by either of the following commands:

With npx:

```bash
npx create-graphback my-project
```

With npm init:

```bash
npm init graphback my-project
```

The CLI will ask you to pick from one of a number of templates. Once chosen, the template will be downloaded to your computer.

Change into your project folder:

```bash
cd my-awesome-project
```

Install dependencies with yarn (or npm):

yarn:

```bash
yarn
```

npm:

```bash
npm install
```

The project will have a GraphQL schema file with some example types which you will likely want to change. Learn how to [design your data models](../model/datamodel).

Each template will be different, so you should follow the guide in your new project's `README` to complete the setup.