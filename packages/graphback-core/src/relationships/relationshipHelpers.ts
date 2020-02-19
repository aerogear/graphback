import { RelationshipMetadata } from '../plugin/ModelRelationshipMetadata';

export function findRelationship(name: string, relationships: RelationshipMetadata[]) {
    return relationships.find((r: RelationshipMetadata) => r.parentField === name);
}

export function findModelRelationships(modelName: string, relationships: RelationshipMetadata[]) {
    return relationships.filter((relationship: RelationshipMetadata) => {
        return relationship.parent.name === modelName;
    });
}