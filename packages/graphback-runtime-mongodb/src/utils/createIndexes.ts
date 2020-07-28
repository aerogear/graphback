import { Collection, IndexSpecification } from "mongodb"
import { GraphQLObjectType, GraphQLField } from "graphql";
import { parseMetadata } from "graphql-metadata";
import { parseRelationshipAnnotation } from "@graphback/core";

export async function findAndCreateIndexes(baseType: GraphQLObjectType, collection: Collection ) {
  const indexes = getIndexFields(baseType);

  await applyIndexes(indexes, collection);
}

export async function applyIndexes(indexes: IndexSpecification[], collection: Collection) {
  if (indexes.length === 0) {
    return;
  }
  collection.createIndexes(indexes).catch((error: any) => {
    let message:string;
    if (error.codeName === "IndexOptionsConflict") {
      // This Index exists but with a different name
      message = `${error.errmsg}, try dropping the existing index or using the same name.`;
    }
    if (error.codeName === "IndexKeySpecsConflict") {
      // Another Index with same name exists
      message = `${error.errmsg}, try manually dropping the existing index or using a different name.`;
    }
    if (error.codeName === "InvalidIndexSpecificationOption") {
      // Invalid options passed to @index
      message = `${error.errmsg}, try double checking what you are passing to @index.`;
    }

    if (message === undefined) {
      message = `Graphback was unable to create the specified indexes: ${error.message}.`
    }

    console.error(`${message} If all else fails, try recreating the index manually.`)
  })
}

export function getIndexFields(baseType: GraphQLObjectType): IndexSpecification[] {
  const res: IndexSpecification[] = [];
  const fields = baseType.getFields();
  Object.keys(fields).forEach((k: string) => {
    const field = fields[k];

    // Add Index on relation fields
    const relationIndex = getRelationIndex(field);
    if (relationIndex !== undefined) {
      res.push(relationIndex);

      return;
    }

    // Add custom Index if found e.g. @index
    const customIndex = getCustomIndex(field);
    if (customIndex !== undefined) {
      res.push(customIndex);
    }

  })

  return res;
}

export function getCustomIndex(field: GraphQLField<any, any>): IndexSpecification {
  const indexMetadata: any = parseMetadata('index', field.description);
  if (indexMetadata) {
    const indexSpec: IndexSpecification = Object.assign({
      key: {
        [field.name]: 1
      }
    }, indexMetadata);

    return indexSpec;
  } else {
    return undefined;
  }
}

export function getRelationIndex(field: GraphQLField<any, any>): IndexSpecification {
  const relationshipData = parseRelationshipAnnotation(field.description)
  if (relationshipData?.kind && ['manyToOne', 'manyToMany'].includes(relationshipData.kind)) {
    return {
      key: {
        [relationshipData.key]: 1
      },
    }
  } else {
    return undefined;
  }
}
