import { GraphQLObjectType, GraphQLOutputType } from 'graphql';

export interface RelationshipMetadata {
    parent: GraphQLObjectType
    parentField: string
    relationshipKind: 'oneToMany' | 'oneToOne'
    relationType: GraphQLObjectType
    relationField: string
    foreignKey?: {
        name: string
        type: GraphQLOutputType
    }
}