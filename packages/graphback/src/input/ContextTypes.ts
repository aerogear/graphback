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
export interface Directive {
  OneToOne?: OneToOne
  OneToMany?: OneToMany
  ManyToMany?: ManyToMany
}

export interface Value {
  // tslint:disable-next-line: no-reserved-keywords
  type: string
  isArray: boolean
  isNull: boolean
  isType: boolean
}

export interface Argument {
  name: string
  value: Value
}

/**
 * Field context of parsed GraphQL type
 */
export interface ModelFieldContext {
  name: string
  // tslint:disable-next-line
  type: string
  isArray: boolean
  isType: boolean
  isNull: boolean
  directives: Directive
  hasDirectives: boolean
  // tslint:disable-next-line: no-banned-terms
  arguments?: Argument[]
}

/**
 * Context type returned from InputTypeVisitor
 */
export interface ModelTypeContext {
  kind: string
  name: string
  fields: ModelFieldContext[]
  interfaces?: InterfaceType[]
  config: GraphQLGeneratorConfig
}


export interface InterfaceType {
  // tslint:disable-next-line: no-reserved-keywords
  type: string
  isArray: boolean
  isNull: boolean
  isType: boolean
}

