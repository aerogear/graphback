import { GraphQLGeneratorConfig } from '../GraphQLGeneratorConfig';

export const INTERFACE_TYPE_DEFINITION = 'InterfaceTypeDefinition';
export const OBJECT_TYPE_DEFINITION = 'ObjectTypeDefinition';
export const OBJECT_TYPE_EXTENSION = 'ObjectTypeExtension';

/**
 * 1:1 relationship directive
 */
export interface OneToOne {
  field?: string
}

/**
 * 1:m relation directive
 */
export interface OneToMany {
  field?: string
}

/**
 * n:m relation directive
 */
export interface ManyToMany {
  tablename?: string
}

/**
 * All relation directive definitions
 */
export interface RelationshipsDirectives {
  OneToOne?: OneToOne
  OneToMany?: OneToMany
  ManyToMany?: ManyToMany
}

export interface ModelArgumentValue {
  // tslint:disable-next-line: no-reserved-keywords
  type: string
  isArray: boolean
  isNull: boolean
  isType: boolean
}

export interface InputModelArgument {
  name: string
  value: ModelArgumentValue
}

/**
 * Field context of parsed GraphQL type
 */
export interface InputModelFieldContext {
  name: string
  // tslint:disable-next-line
  type: string
  isArray: boolean
  isType: boolean
  isNull: boolean
  directives: RelationshipsDirectives
  hasDirectives: boolean
  // tslint:disable-next-line: no-banned-terms
  arguments?: InputModelArgument[]
}

/**
 * Type information from Graphback model. 
 * This interface is being used in entire graphback ecoystem to carry all 
 * required information about model that can be used to generate GraphQL Schema, Resolvers etc.
 * Context type returned from `InputTypeVisitor`
 */
export interface InputModelTypeContext {
  kind: string
  name: string
  fields: InputModelFieldContext[]
  interfaces?: InputInterfaceType[]
  config: GraphQLGeneratorConfig
}


export interface InputInterfaceType {
  // tslint:disable-next-line: no-reserved-keywords
  type: string
  isArray: boolean
  isNull: boolean
  isType: boolean
}

