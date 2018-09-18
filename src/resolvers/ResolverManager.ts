import { Type } from 'graphql-codegen-core';
import { logger } from '../logger';
import { ResolverInstance } from './ResolverInstance'
import { ResolverType } from './ResolverType'



/**
 * Manager interface responsible for creating resolvers for specified types
 */
export interface ResolverManager {
  /**
   * Ge
   * @param types types that should be source for generating resolvers
   * @param resolverTypes determines what resolvers should be generated
   */
  build(types: Type[], resolverTypes: ResolverType[]): Promise<ResolverInstance[]>
}


/**
 * Resolver that builds queries using knex library
 */
export class KnexResolverManager implements ResolverManager {

  // GraphQL object that will be used to retrieve all arguments passed to resolver.
  private argumentContext: string;

  // context in which db is
  private knexContext: String;
  private prefix: String;

  /**
   * Creates resolver manager for knex
   *
   * @param argumentContext context for generated arguments
   * @param knexContext name of knex object that was exposed
   * @param prefix table prefix
   */
  constructor(prefix: String = "", argumentContext: string = 'resolve.args', knexContext: String = 'db') {
    this.argumentContext = argumentContext;
    this.knexContext = knexContext
    this.prefix = prefix;
  }

  public build(types: Type[], resolverTypes: ResolverType[]): Promise<ResolverInstance[]> {
    const resolverFormats: ResolverInstance[] = [];
    types.forEach((gqlType: Type) => {
      resolverTypes.forEach((resolverType: ResolverType) => {
        if (resolverType === ResolverType.FIND_ALL) {
          resolverFormats.push(this.buildFindAll(gqlType));
        } else if (resolverType === ResolverType.CREATE) {
          resolverFormats.push(this.buildCreate(gqlType));
        } else if (resolverType === ResolverType.READ) {
          resolverFormats.push(this.buildRead(gqlType));
        } else if (resolverType === ResolverType.FIND) {
          resolverFormats.push(this.buildFind(gqlType));
        } else if (resolverType === ResolverType.UPDATE) {
          resolverFormats.push(this.buildUpdate(gqlType));
        } else if (resolverType === ResolverType.DELETE) {
          resolverFormats.push(this.buildDelete(gqlType));
        } else {
          logger.error(`Unsupported format when generating resolver ${this.prefix}${gqlType.name.toLowerCase()} for resolver type ${resolverType} `)
        }
      })
    })

    return Promise.resolve(resolverFormats);
  }

  // Notes: Server side needs to be refactored to properly implement methods bellow
  // 1. We need to drop request/response pattern and have just implementation field.
  // 2. Formalize input (resolve.parent.id/resolve.args.email etc.)
  // 3. Argument context should be an interface (see above)
  private buildCreate(gqlType: Type): ResolverInstance {
    return {
      fieldName: this.getFieldName(gqlType.name, ResolverType.CREATE),
      action: ResolverType.CREATE,
      resolverType: "Mutation",
      implementation: `return ${this.knexContext}(${this.prefix}${gqlType.name.toLowerCase()}).insert(${this.argumentContext}).returning('*')`
    }
  }

  private buildUpdate(gqlType: Type): ResolverInstance {
    return {
      fieldName: this.getFieldName(gqlType.name, ResolverType.UPDATE),
      action: ResolverType.UPDATE,
      resolverType: "Mutation",
      // Needs fix
      implementation: `return ${this.knexContext}(${this.prefix}${gqlType.name.toLowerCase()}).insert(${this.argumentContext}).returning('*')`
    }
  }

  private buildDelete(gqlType: Type): ResolverInstance {
    return {
      fieldName: this.getFieldName(gqlType.name, ResolverType.DELETE),
      resolverType: "Mutation",
      action: ResolverType.DELETE,
      // Needs fix for id etc.
      implementation: `return ${this.knexContext}(${this.prefix}${gqlType.name.toLowerCase()}).where('id', ${this.argumentContext}.id).del()`
    }
  }

  private buildFindAll(gqlType: Type): ResolverInstance {
    return {
      fieldName: this.getFieldName(gqlType.name, ResolverType.FIND_ALL),
      resolverType: "Query",
      action: ResolverType.FIND_ALL,
      implementation: `${this.knexContext}.select().from('${this.prefix}${gqlType.name.toLowerCase()}')`
    }
  }
  private buildFind(gqlType: Type): ResolverInstance {
    return {
      fieldName: this.getFieldName(gqlType.name, ResolverType.FIND),
      action: ResolverType.FIND,
      resolverType: "Query",
      // Needs fix
      implementation: `${this.knexContext}.select().from('${this.prefix}${gqlType.name.toLowerCase()}')`
    }
  }
  private buildRead(gqlType: Type): ResolverInstance {
    return {
      fieldName: this.getFieldName(gqlType.name, ResolverType.READ),
      action: ResolverType.READ,
      resolverType: "Query",
      // Needs fix
      implementation: `${this.knexContext}.select().from('${this.prefix}${gqlType.name.toLowerCase()}')`
    };
  }

  // Helper function for building the right names
  private getFieldName(typeName: string, action: ResolverType, plural: string = ''): string {
    const camelizedType = typeName.charAt(0).toUpperCase() + typeName.substr(1);

    return `${action}${camelizedType}${plural}`
  }


}
