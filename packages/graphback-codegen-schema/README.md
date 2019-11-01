## Graphback

<p align="center">
  <img width="400" src="https://github.com/aerogear/graphback/raw/master/website/static/img/graphback.png">
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

**Documentation**: https://graphback.dev
**Repository**: https://github.com/aerogear/graphback/

## Graphback-Codegen-Client 

Generator for client side queries

## Usage

```ts
import { createClient } from "@graphback/codegen-client"
import { graphQLInputContext } from "@graphback/codegen-core"

const inputContext = graphQLInputContext.createModelContext(schemaText, {})
console.log(createClient(inputContext));
```