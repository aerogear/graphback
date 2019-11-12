---
title: Crash course on Graphback
tags: graphql, nodejs, graphback
author: Michal Stokluska
authorURL: https://www.linkedin.com/in/michal-stokluska-350a72123
---

Building software can be sometimes overwhelming. As junior developers, we are often looking for a sample application that can guide us thru complex server and client architectures. However, as a junior dev, we are often facing problems of templates being too complex or too simple, making the learning process more convoluted. 

<!--truncate-->

As a software engineer, I always wanted to learn more by building things, while having some form of standard I can base on when building an end to end solutions.
 
Graphback in a CLI tool that can help build an entire GraphQL server and a client within seconds! It is an open-source project that is currently being available as beta with lots of amazing features to come! 

Graphback will generate schema and resolvers along with generating a database structure. It also addresses the difficulty of configuring a GraphQL server from scratch, and I know that our GraphQL server wasn't particularly difficult to set, but imagine how much work we would have if only we had more types in our server! All graphback needs from you is your schema and it will do everything else for you. However, there's a little bit more that you need to know in order to use full graphback potential. 

## Requirements

We are not going to go deep in everything that Graphback has to offer but it would be handy if you could make yourself familiar with:

- [Docker](https://opensource.com/resources/what-docker)
- [Subscriptions](https://www.apollographql.com/docs/apollo-server/features/subscriptions/)
- [TypeScript](https://www.typescriptlang.org/)
- [Knex](http://knexjs.org/)

However, if you only would like to see how easy it can be to create a GraphQL server, I will explain everything you need to know in this tutorial.

## Let's start!

- Our very first step is going to be installing Docker. Just follow the steps from [here](https://runnable.com/docker/getting-started/). To give you a brief on Docker, it is a platform that allows building containers that can contain libraries that are required for an application to start. For example, we are going to use Docker as our PostgreSQL provider. Without Docker, you would need to install entire Postgre SQL server on your local machine and then set it up. With docker, all you do is downloading an image of ready to go, out of the box - Postgres!

- Once done, to double-check if your docker was installed correctly type:
```sh
$ docker -v
```
- Next, create a new folder called `graphback`
- Navigate to that folder and in command line type:
```sh
$ npm install -g graphback-cli
```
- To start graphback run following command:
```sh
$ graphback init YOUR_PROJECT_NAME
```
Where YOUR_PROJECT_NAME is your own name of the project.
- Choose "apollo-starter-ts".
- "No" for example model and PostgreSQL for your database.
- Once it's generated, navigate to your newly created project. It is going to be right in your `graphback` folder.

- In new folder navigate to `src/resolvers/`, there should be only one file here called `index.ts` and as you can see in this file, there are no resolvers generated just yet.
- Now navigate to `model/Default.graphql`, delete what's in there and paste our own types that we are well used to:
```
type User {
    id: ID!
    firstName: String!
    lastName: String!
    title: String!
    email: String
}

type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    assignedTo: [User!]!
}
```
- Now type in your terminal:
```sh
$ graphback generate
```
- Next, open your `./src/resolvers/generated/` and witness the power of Graphback!

Open your `task.ts` and `user.ts` and look through all the hard work Graphback did for you! I know that the code behind the resolvers might not be understandable to you at the moment but I'm sure with a bit of hard work you will be able to write your resolvers the very same way!

- Our next step is to test it out! In your terminal type:
```sh
$ docker-compose up
```
This will launch a docker image that has Postgre SQL and Redis set up. We are not going to worry about it too much, however, docker is a very powerful tool and I'm sure understanding it will give you a huge advantage in the future.

- Type in your console: 
```sh
$ graphback db
```
This command is going to build a database structure in Postgre SQL database based on your schema.

- Next, because Graphback is using Typescript it needs to be compiled before we can run it on our machine. To do that run:
```sh
$ npm run build
```
Build is going to use the `build` script from package.json which simply 
compiles TypeScript code into JavaScript.
- Finally, we can run:
```sh
$ npm run start
```
And our server is ready at [localhost:4000/graphql](http://localhost:4000/graphql)! From now on you got access to all of the generated resolvers.  You can view all available queries and mutation in the playground by clicking "Schema" sidebar on the right-hand side of the playground!

- Graphback also allows for the use of so-called "Directives" which are extensions that can be attached to types and can affect the execution of a query. Let's re-construct our GraphQL server so that we can delete `Task`, but we can not delete `User`. To do that just add `@delete` to our `Task` type in `model/Default.graphql`:
```
type User {
    id: ID!
    firstName: String!
    lastName: String!
    title: String!
    email: String
}

type Task @delete {
    id: ID!
    title: String!
    description: String!
    status: String!
    assignedTo: [User!]!
}
```
- Now let's regenerate our resolvers with:
```sh
$ graphback generate
```
- Navigate again to `./src/resolvers/generated` and you will have a new `delete` mutation in `task`, but not in `user`. To test it rebuild our database:
```sh
$ graphback db
```
- Recompile our code:
```sh
$ npm run build
```
- Launch the server and give it a go!
```sh
$ npm run start
```

- If you would like a resolver 'Delete' to be created for all your types, navigate to `./config.json` file and change `delete` field value to `true`:
```js
{
  "dbConfig": {
    "user": "postgresql",
    "password": "postgres",
    "database": "users",
    "host": "127.0.0.1",
    "port": 55432
  },
  "generation": {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": false, <----------------------------------------
    "subCreate": false,
    "subUpdate": false,
    "subDelete": false,
    "disableGen": false
  },
  "database": "pg"
}
```
Treat this file like a settings file for Graphback generator. By default `delete` generation is disabled hence the need for enabling it one by one in our types specification. However, you can change the value of `delete` to `true` and it will be autogenerated for all your types! If your familliar with subscriptions try changing `subCreate` field to `true` or use `@subCreate` directive, regenerate server and enjoy subscription resolvers being written for you!

- Graphack also allows for inserting your own resolvers! Let's give it a go! Go to `./model/Default.graphql` and add our own query `userByName`:

```
type User {
    id: ID!
    firstName: String!
    lastName: String!
    title: String!
    email: String
}

type Task @delete {
    id: ID!
    title: String!
    description: String!
    status: String!
    assignedTo: [User!]!
}

type Query {
    userByName(firstName: String!): User!
}
```
 - Now we need to regenerate with:
```sh
$ graphback generate
```
And if you navigate to `./src/resolvers/custom` you will see `userByName.ts` file. As it is custom resolver we need to implement it ourselves. Change it to:
```js
export const userByName = {
  Query: {
    userByName: (_: any, args: any, context: any) => {
      return context.db.select().from('user').where('firstName', '=', args.firstName)
    }
  }
}
```
Resolver looks different then the ones we did in previous tutorials as it is written in TypeScript and uses knex to communicate with a database, but the idea is generally the same as in previous GraphQL tutorial.

- Next, we need to repeat our 3-step process:
```sh
$ graphback db
$ npm run build
$ npm run start
```
And navigate to [localhost:4000/graphql](http://localhost:4000/graphql) to test it!

- Let's test its functionality and execute the following queries and mutations:

Our task query should return all tasks: 

![All task query](https://thepracticaldev.s3.amazonaws.com/i/cy8ssvrsbrgp0oh5bg16.png)

However, as our database is empty it will simply return an empty array!

- Let's add some data to our database:

![addTask](https://thepracticaldev.s3.amazonaws.com/i/z07djlgen5974ha4uwe0.png)

As you can see, Grapback generates mutation in a slightly different way than what we have done, but if you think about, it simply takes in another type called `taskInput` which consists of `title` `description` and `status` while our `ID` is auto-generate increment! 

- Now we can add our first `user`:

![Mutation add user](https://thepracticaldev.s3.amazonaws.com/i/j3faa4msdtmus5q7i1xv.png)

Our database consists of a single user and a single task from now on!
- We can now check if our queries are working the way they should:

![findByName query](https://thepracticaldev.s3.amazonaws.com/i/y19ahvvnmlrt1besgbjo.png)

## Summary

Graphback offers a lot of features out of the box. This easy to use, amazing, technology - helped me realize how powerful and life-changing software development can be. Writing an entire GraphQL server line by line which can be very time consuming, setting up subscriptions and using directives can take days or weeks to do! While Graphback can generate it for you within seconds! Imagine how powerful this tool can be in the world where developers are doing their best to provide a working prototype of an application as soon as possible, imagine the time saved that will come from typing `graphback generate` after populating your `typeDefs` instead of all the planning, coding and testing your back end. You will still need to 
implement your custom business logic yourself, but the core functionality will be provided saving you time from writing a lot of boilerplate.
