import { RelationshipMetadata } from '../plugin/ModelRelationshipMetadata';

export function findRelationship(name: string, relationships: RelationshipMetadata[]) {
    return relationships.find((r: RelationshipMetadata) => r.parentField === name);
}