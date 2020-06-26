import { GraphQLResolveInfo } from 'graphql';
import { fieldsMap } from 'graphql-fields-list';
import { FieldRelationshipMetadata } from '../relationships/RelationshipMetadataBuilder';
import { ModelDefinition } from './ModelDefinition';

/**
 * Find selectable fields from resolve info for a given model starting on a given path
 * @param info - the resolver info object
 * @param model - the model to find the fields from
 * @param path - the root path to start field resolution from.
 */
export const getSelectedFieldsFromResolverInfo = (info: GraphQLResolveInfo, model: ModelDefinition, path?: string) => {
  const resolverFields = fieldsMap(info, { path });
  const selectedFields = Object.entries(resolverFields)
    .reduce((
      acc: Set<string>,
      entry: [string, unknown]
    ) => {

      if (typeof entry[1] !== 'object') {
        acc.add(entry[0]);
      } else {
        // it is a nested object, check if it is a relationship to add the appropriate foreign key field
        const foundRelationship = model.relationships.find((relationship: FieldRelationshipMetadata) => relationship.ownerField.name === entry[0]);
        if (foundRelationship) {
          if (foundRelationship.kind !== "oneToMany") {
            acc.add(foundRelationship.relationForeignKey);
          } else {
            acc.add(model.primaryKey);
          }
        } else {
          acc.add(entry[0])
        }
      }

      return acc;
    } , new Set<string>());

  return [...selectedFields];
}
