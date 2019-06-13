## apollo-starter-ts

Starter template using graphback and apollo-server

### Usage
```
docker-compose up -d
npm start
```

### Project structure

```
|-----generated
       |-----schema.graphql
       |-----resolvers.ts
|-----model
       |-----<your-model-name>.graphql
|-----src
       |-----config
             |-----config.ts
       |-----db.ts
       |-----index.ts
       |-----mapping.ts
|-----package.json
|-----Dockerfile
|-----docker-compose.yml
|-----package-lock.json
|-----tslint.json
|-----README.md
```