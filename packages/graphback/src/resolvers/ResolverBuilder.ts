import { Type } from 'graphql-codegen-core';
import { DatabaseContextProvider } from '../datasource/DatabaseContextProvider';
import * as knexTemplates from './knex'
import { MetadataInstance } from './MetadataInstance'
import { ResolverType } from './ResolverType'

/**
 * Build metadata to create schema and resolver
 */
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
  constructor(argumentContext: string = 'args', knexContext: string = 'context.db') {
    this.argumentContext = argumentContext;
    this.knexContext = knexContext
  }

  // Notes: Server side needs to be refactored to properly implement methods bellow
  // 1. We need to drop request/response pattern and have just implementation field.
  // 2. Formalize input (root.id/args.email etc.)
  // 3. Argument context should be an interface (see above)
  public buildCreate(gqlType: Type): MetadataInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.CREATE);

    return {
      fieldName: fieldName,
      schemaDefinition: `${fieldName}(input: ${gqlType.name}Input!): ${gqlType.name}!`,
      implementation: knexTemplates.createTemplate(fieldName, tableName, this.knexContext, this.argumentContext)
    }
  }

  public buildUpdate(gqlType: Type): MetadataInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.UPDATE);

    return {
      fieldName: fieldName,
      schemaDefinition: `${fieldName}(id: ID!, input: ${gqlType.name}Input!): ${gqlType.name}!`,
      implementation: knexTemplates.updateTemplate(fieldName, tableName, this.knexContext, this.argumentContext)
    }
  }

  public buildDelete(gqlType: Type): MetadataInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.DELETE);

    return {
      fieldName: fieldName,
      schemaDefinition: `${fieldName}(id: ID!): ID!`,
      implementation: knexTemplates.deleteTemplate(fieldName, tableName, this.knexContext, this.argumentContext)
    }
  }

  public buildFindAll(gqlType: Type): MetadataInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.FIND_ALL, 's');

    // TODO Pagination support
    return {
      fieldName: fieldName,
      schemaDefinition: `${fieldName}: [${gqlType.name}]!`,
      implementation: knexTemplates.findAllTemplate(fieldName, tableName, this.knexContext, this.argumentContext)
    }
  }

  public buildFind(gqlType: Type): MetadataInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.FIND, 's');

    // TODO Pagination support
    return {
      fieldName: fieldName,
      schemaDefinition: `${fieldName}(fields: ${gqlType.name}Filter): [${gqlType.name}]!`,
      implementation: knexTemplates.findTemplate(fieldName, tableName, this.knexContext, this.argumentContext)
    }
  }

  public buildRead(gqlType: Type): MetadataInstance {
    const tableName = this.context.getFieldName(gqlType)
    const fieldName = this.getFieldName(gqlType.name, ResolverType.READ);

    return {
      fieldName: fieldName,
      schemaDefinition: `${fieldName}: ${gqlType.name}!`,
      implementation: knexTemplates.readTemplate(fieldName, tableName, this.knexContext, this.argumentContext)
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
