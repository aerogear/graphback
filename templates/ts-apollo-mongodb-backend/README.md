## Graphback Apollo+MongoDB Runtime Template

Template showcases Graphback Runtime capabilities using
resolver layer created in-memory as opposed to codegeneration.

Serverless example can be build as docker image with configurable volume for models. 
This models will be processed at application at startup giving fully featured GraphQL Server 
following Graphback CRUD specification.

For more information please refer to: 


### Project structure

The project contains the following set of source files. 

* The `model` folder, which contains a GraphQL schema file defining your [business models](https://graphback.dev/docs/model/datamodel). This file can be edited to suit your needs;
* The `.graphlrc.yml` file defining the configuration like the path to business model declaration, how to peform code generation from the GraphQL types to Typescript types etc. The configuration file is defined using the GraphQL project using [`graphql-config`](https://graphql-config.com/introduction).
* A `docker-compose.yml` file to spin up the database if you do not have a running instance 
* A `.env` file that contains different environment variables
* A `src` folder which has:
  * A `resolvers` folder where you can declare your custom resolvers to suit your use cases. This folder contains an example `src/resolvers/noteResolvers.ts` resolver file which can be deleted or modified. See [Custom Resolvers guide](https://graphback.dev/docs/resolvers/custom-resolvers) for more information. 
  * A `schema` folder which contains generated schema file. It's advised to not edit this file manually. See [Generating types](#re-generating-types-from-schema)
  * A `generated-types.ts` file, which is also generated as indicated by its name. See [Generating types](#re-generating-types-from-schema)
  * A `index.ts` file which configures and starts a [Graphback application](https://graphback.dev/docs/getting-started/add-to-project).
  * A `db.ts` file which indicates how to start a database connection.

> NOTE: All the files can be edited according to your needs except for those that are generated (no need to edit them as they'll be re-generated anyway).  
 
### Running example

The project has been created using `graphback`. Run the project using the following steps.

- Start the database

```
docker-compose up -d
```

- Define your schema in the `model/datamodel.graphql` file. Or use the default:

```graphql
type User {
  _id: GraphbackObjectID!
  name: String
}

scalar GraphbackObjectID
```

- Start the server

```
npm run develop
```

Or, if using yarn

```
yarn develop
```

For more on customising your Graphback application, check out [our docs](https://graphback.dev/docs/gettingstarted)

If your project contains client application please follow `./client/README.md` for running client side application

## Re-generating types from schema

If you made made changes to your business model, it's advised to regenerate the `generated-types.ts` which contains Typescript file of your business entities. 

To do so, we'll first need to update the generated `schema.graphql` file with the following command:

```
yarn graphback generate
```

Then generate the `generated-types.ts` file with the following command:

```
yarn codegen
```
