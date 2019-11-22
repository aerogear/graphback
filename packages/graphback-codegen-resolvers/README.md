## Graphback

<p align="center">
  <img width="400" src="https://github.com/aerogear/graphback/raw/master/website/static/img/graphback.png">
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

**Documentation**: https://graphback.dev
**Repository**: https://github.com/aerogear/graphback/

## Graphback-Codegen-Resolvers 

Generator for Graphback Resolver layer.
Supports generating resolvers using typescript or javascript languages
## Usage

```ts
import { generateResolvers } from "@graphback/codegen-resolvers"
import { graphQLInputContext } from "@graphback/core"

const inputContext = graphQLInputContext.createModelContext(schemaText, {})
const resolverOptions = {
  format: 'ts',
  types: {
    typesImportStatement: 'import { Resolvers } from "../../generated-types"',
    resolverType: 'Resolvers',
  }
};

const resolvers = generateResolvers(inputContext, resolverOptions);
```