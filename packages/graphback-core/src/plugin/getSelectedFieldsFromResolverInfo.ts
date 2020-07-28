import { GraphQLResolveInfo } from 'graphql';
import { fieldsMap } from 'graphql-fields-list';
import { FieldRelationshipMetadata } from '../relationships/RelationshipMetadataBuilder';
import { ModelDefinition } from './ModelDefinition';

/**
 * Fields that starts with `__` are considered internal fields which can be safely ignored
 * when retrieving user selected fields.
 */
const INTERNAL_NON_USER_FIELDS = ['__typename'];

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
      let selectedField: string;

      if (typeof entry[1] !== 'object') {
        selectedField = entry[0];
      } else {
        // it is a nested object, check if it is a relationship to add the appropriate foreign key field
        const foundRelationship = model.relationships.find((relationship: FieldRelationshipMetadata) => relationship.ownerField.name === entry[0]);
        if (foundRelationship) {
          if (foundRelationship.kind !== "oneToMany") {
            selectedField = foundRelationship.relationForeignKey;
          } else {
            selectedField = model.primaryKey.name;
          }
        } else {
          selectedField = entry[0];
        }
      }

      if (selectedField && !INTERNAL_NON_USER_FIELDS.includes(selectedField)) {
        acc.add(selectedField);
      }

      return acc;
    } , new Set<string>());

  return [...selectedFields];
}
