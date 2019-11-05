<<<<<<< HEAD:packages/graphback-codegen-resolvers/src/legacy-knex/LegacyResolverGenerator.ts
import { InputModelTypeContext } from "@graphback/core"
import { generateGraphbackResolvers } from './LegacyApolloResolverTemplate';
import { ResolverTypeContext } from './resolverTypes';
import { buildResolverTargetContext, createCustomContext } from './targetResolverContext';
=======
import { InputModelTypeContext } from "@graphback/codegen-core"
import { ResolverTypeContext } from './api/resolverTypes';
import { buildResolverTargetContext } from './targetResolverContext';
import { generateGraphbackResolvers } from './formatters/ApolloResolverFormatter';
>>>>>>> b2ebcd6... fix: remove legacy resolver generators:packages/graphback-codegen-resolvers/src/LegacyResolverGenerator.ts

/**
 * generate schema using context created using visitor pattern
 * and string templates
 */
export class LegacyResolverGenerator {
    private context: ResolverTypeContext[]
    private inputContext: InputModelTypeContext[]

    constructor(inputContext: InputModelTypeContext[]) {
      this.inputContext = inputContext
    }

    public generate(database: string) {
      this.context = buildResolverTargetContext(this.inputContext, database)

      return generateGraphbackResolvers(this.context, this.inputContext)
    }
  }
