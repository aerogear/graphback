import { Type, gql } from 'graphql-codegen-core';
import { DatabaseContextProvider } from '../datasource/DatabaseContextProvider';
import { ResolverInstance } from './ResolverInstance'
import { ResolverType } from './ResolverType'


export class ResolverBuilder {
  // GraphQL object that will be used to retrieve all arguments passed to resolver.
  public argumentContext: string;
  // context for knex object
  public knexContext: string;

  private context: DatabaseContextProvider;

  /**
   * Creates resolver manager for knex
   *
   * @param argumentContext context for generated arguments
   * @param knexContext name of knex object that was exposed
   */
  constructor(argumentContext: string = 'args', knexContext: string = 'db') {
    this.argumentContext = argumentContext;
    this.knexContext = knexContext
  }

  // Notes: Server side needs to be refactored to properly implement methods bellow
  // 1. We need to drop request/response pattern and have just implementation field.
  // 2. Formalize input (root.id/args.email etc.)
  // 3. Argument context should be an interface (see above)
  public buildCreate(gqlType: Type): ResolverInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.CREATE);

    return {
      fieldName: fieldName,
      typeName: gqlType.name,
      schemaDefinition: `${fieldName}(input: ${gqlType.name}Input!): ${gqlType.name}!`,
      action: ResolverType.CREATE,
      resolverType: "Mutation",
      implementation: `(root, args, context, info) => {
        return ${this.knexContext}('${tableName}').insert(${this.argumentContext}.input).returning('*')
      }`
    }
  }

  public buildUpdate(gqlType: Type): ResolverInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.UPDATE);

    return {
      fieldName: fieldName,
      typeName: gqlType.name,
      schemaDefinition: `${fieldName}(id: ID!, input: ${gqlType.name}Input!): ${gqlType.name}!`,  
      action: ResolverType.UPDATE,
      resolverType: "Mutation",
      implementation: `${fieldName} = (root, args, context, info) => {
      return ${this.knexContext}('${tableName}').where('id', '=' , ${this.argumentContext}.id).update(${this.argumentContext}.input).then( () => {
        return ${this.knexContext}.select().from('${tableName}').where('id', '=' , ${this.argumentContext}.id);
      })}`
    }
  }

  public buildDelete(gqlType: Type): ResolverInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.DELETE);

    return {
      fieldName: fieldName,
      typeName: gqlType.name,
      schemaDefinition: `${fieldName}(id: ID!): ID!`,
      action: ResolverType.UPDATE,
      resolverType: "Mutation",
      implementation: `(root, args, context, info) => {
        return ${this.knexContext}('${tableName}').where('id', '=' , ${this.argumentContext}.id).del().then( () => {
        return ${this.argumentContext}.id;
      })}`
    }
  }

  public buildFindAll(gqlType: Type): ResolverInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.FIND_ALL, 's');

    // TODO Pagination support
    return {
      fieldName: fieldName,
      typeName: gqlType.name,
      schemaDefinition: `${fieldName}: [${gqlType.name}]!`,
      action: ResolverType.FIND_ALL,
      resolverType: "Query",
      implementation: `(root, args, context, info) => {
        return ${this.knexContext}.select().from('${tableName}')
      }`
    }
  }

  public buildFind(gqlType: Type): ResolverInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.FIND, 's');

    // TODO Pagination support
    return {
      fieldName: fieldName,
      typeName: gqlType.name,
      schemaDefinition: `${fieldName}(fields: QueryFilter): [${gqlType.name}]!`,
      action: ResolverType.FIND,
      resolverType: "Query",
      implementation: `(root, args, context, info) => {
        return ${this.knexContext}.select().from('${tableName}').where(${this.argumentContext}.field.name, '=', ${this.argumentContext}.field.value)
      }`
    }
  }

  public buildRead(gqlType: Type): ResolverInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.READ);

    return {
      fieldName: fieldName,
      typeName: gqlType.name,
      schemaDefinition: `${fieldName}: ${gqlType.name}!`,
      action: ResolverType.READ,
      resolverType: "Query",
      implementation: `(root, args, context, info) => {
        return ${this.knexContext}.select().from('${tableName}').where('id', '=' , ${this.argumentContext}.id);
      }`
    }
  }

  // Helper function for building the right names
  public getFieldName(typeName: string, action: ResolverType, plural: string = ''): string {
    const upperCasedType = typeName.charAt(0).toUpperCase() + typeName.substr(1);

    return `${action}${upperCasedType}${plural}`
  }

  public setContext(context: DatabaseContextProvider): void {
    this.context = context;
  }
}
