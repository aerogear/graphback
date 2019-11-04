## Graphback

<p align="center">
  <img width="400" src="https://github.com/aerogear/graphback/raw/master/website/static/img/graphback.png">
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

**Documentation**: https://graphback.dev
**Repository**: https://github.com/aerogear/graphback/

## Graphback-Codegen-Schema 

Generator for full GraphQL Schema. 
Generator accepts Graphback model as input and uses it to generate fully functional schema

## Usage

```ts
import { SchemaGenerator, gqlSchemaFormatter } from "@graphback/codegen-schema"
import { graphQLInputContext } from "@graphback/codegen-core"

const inputContext = graphQLInputContext.createModelContext(schemaText, {})
const schemaGenerator = new SchemaGenerator(inputContext, gqlSchemaFormatter)
const schema = schemaGenerator.generate()
console.log(schema);
```