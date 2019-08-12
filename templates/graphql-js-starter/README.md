## graphql-server-ts

Starter template using graphback and graphql-js

### Usage
The project has been created using `graphback`. Run the project using the following steps. 
- Start the database
```
docker-compose up -d
```
- Generate resources(schema and resolvers) and create database
```
graphback generate
graphback db
```
- Start the server
```
npm start
```