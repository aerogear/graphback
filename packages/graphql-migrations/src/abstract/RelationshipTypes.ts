import { GraphQLObjectType } from "graphql";

interface DatabaseRelationship {
  kind: 'OneToMany' | 'ManyToOne' | 'OneToOne' | 'ManyToMany'
}

export interface OneToManyRelationship extends DatabaseRelationship {
  kind: 'OneToMany'
  relation: GraphQLObjectType
  type: GraphQLObjectType
  description: any
}
