---
id: existingproject
title: Adding Graphback to your Node.js project
sidebar_label: Add to existing project
---

## Adding Graphback to existing project using Graphback CLI

Graphback CLI can be used to add code generation capabilities to your existing Node.js Server that implements GraphQL API.

```bash
npx graphback-cli config
```

Follow the on-screen instructions.

Graphback will do the following:

- Create `.graphqlrc.yml` file with default Graphback plugins
- Initialize an example model file 
- Add required packages to your `package.json` file

## Next Steps

1. To change the default application configuration see [Graphback Config](./config.md).

2. See [Defining your Data model](./datamodel.md) for how to design your data model.

3. Graphback provides a number of different data sources which can be configured at application runtime. See [Data Sources](../db/datasources).

4. If you are using a PostgreSQL datasource you can migrate your database to match your schema. See [Database Migrations](../db/migrations.md) for more.

5. Run your application! 🚀