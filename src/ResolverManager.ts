import { Field, Type } from 'graphql-codegen-core';
import { logger } from './logger';
import { ResolverType } from './ResolverType'

/**
 * Defines format for created resolvers
 */
export interface IResolverFormat {

  /**
   * Name of filed that should be used for this resolver.
   * For example for:
   *
   * type Query {
   *  getUser: User!
   * }
   *
   * Field name will be getUser
   */
  fieldName: String,

  /**
   * Type of action for resolver
   */
  action: ResolverType,

  /**
   * String that contains implementation
   * This could be javascript source code, sql query or json
   */
  implementation: String
}


/**
 * Manager interface responsible for creating resolvers for specified types
 */
export interface IResolverManager {
  /**
   * Ge
   * @param types types that should be source for generating resolvers
   * @param resolverTypes determines what resolvers should be generated
   */
  build(types: Type[], resolverTypes: ResolverType[]): Promise<IResolverFormat[]>
}


/**
 * Resolver that builds queries using knex library
 */
export class KnexResolverManager implements IResolverManager {

  // GraphQL object that will be used to retrieve all arguments passed to resolver.
  private argumentContext: string;

  // context in which db is
  private knexContext: String;

  constructor(argumentContext: string = 'resolve.args', knexContext: String = 'db') {
    this.argumentContext = argumentContext;
    this.knexContext = knexContext
  }

  public build(types: Type[], resolverTypes: ResolverType[]): Promise<IResolverFormat[]> {
    const resolverFormats: IResolverFormat[] = [];
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
          logger.error(`Unsupported format when generating resolver ${gqlType.name} for resolver type ${resolverType} `)
        }
      })
    })

    return Promise.resolve(resolverFormats);
  }

  private buildCreate(gqlType: Type): IResolverFormat {
    return {
      fieldName: gqlType.name,
      action: ResolverType.CREATE,
      implementation: `return ${this.knexContext}(${gqlType.name}).insert(${this.argumentContext}).returning('*')`
    }
  }

  private buildFindAll(gqlType: Type): IResolverFormat {
    return {
      fieldName: gqlType.name,
      action: ResolverType.FIND_ALL,
      implementation: `${this.knexContext}.select().from('${gqlType.name}')`
    }
  }

  private buildDelete(gqlType: Type): IResolverFormat {
    return {
      fieldName: gqlType.name,
      action: ResolverType.DELETE,
      // Needs fix for id etc.
      implementation: `return ${this.knexContext}(${gqlType.name}).where('id', ${this.argumentContext}.id).del()`
    }
  }
  private buildUpdate(gqlType: Type): IResolverFormat {
    return {
      fieldName: gqlType.name,
      action: ResolverType.UPDATE,
      // Needs fix
      implementation: `return ${this.knexContext}(${gqlType.name}).insert(${this.argumentContext}).returning('*')`
    }
  }
  private buildFind(gqlType: Type): IResolverFormat {
    return {
      fieldName: gqlType.name,
      action: ResolverType.FIND,
      // Needs fix
      implementation: `${this.knexContext}.select().from('${gqlType.name}')`
    }
  }
  private buildRead(gqlType: Type): IResolverFormat {
    return {
      fieldName: gqlType.name,
      action: ResolverType.READ,
      // Needs fix
      implementation: `${this.knexContext}.select().from('${gqlType.name}')`
    };
  }

  // Notes: Server side needs to be refactored to implement this properly
  // 1. We need to drop request/response pattern and have just implementation field.
  // 2. Formalize input (resolve.parent.id/resolve.args.email etc.)
  // 3. Argument context should be an interface (see above)
}
