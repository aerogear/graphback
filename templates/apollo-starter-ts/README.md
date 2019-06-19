## apollo-starter-ts

Starter template using graphback and apollo-server

### Usage
The project has been created using `graphback`. Run the project using the following steps. 
- Start the databse
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

### Directory structure

```
|-----generated
|-----model                        //Model - type declaration
|-----src
       |-----config                //server config
       |-----db.ts                 //db connection
       |-----index.ts
       |-----mapping.ts            //map generated content
|-----package.json
|-----Dockerfile
|-----docker-compose.yml
|-----package-lock.json
|-----tslint.json
|-----README.md
```