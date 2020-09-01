import { parseMetadata } from "graphql-metadata";
import { GraphQLObjectType } from 'graphql';

export type FieldTransformer = (value?: any) => any;


export interface FieldTransform {
  fieldName: string,
  transform: FieldTransformer
}

/* eslint-disable no-shadow */
export enum TransformType {
  UPDATE = "onUpdateFieldTransform",
  CREATE = "onCreateFieldTransform"
}
/* eslint-enable no-shadow */

export type FieldTransformMap = {
  [TransformType.CREATE]: FieldTransform[],
  [TransformType.UPDATE]: FieldTransform[]
};

export function getFieldTransformations(baseType: GraphQLObjectType): FieldTransformMap {
  const fieldMap = baseType.getFields();
  const fieldTransformMap : FieldTransformMap = {
    [TransformType.CREATE]: [],
    [TransformType.UPDATE]: []
  };
  for (const field of Object.values(fieldMap)) {
    if (parseMetadata("updatedAt", field.description)) {
      fieldTransformMap[TransformType.UPDATE].push({
        fieldName: field.name,
        transform: () => {
          return new Date().getTime();
        }
      });
      fieldTransformMap[TransformType.CREATE].push({
        fieldName: field.name,
        transform: () => {
          return new Date().getTime();
        }
      });
    }
    if (parseMetadata("createdAt", field.description)) {
      fieldTransformMap[TransformType.CREATE].push({
        fieldName: field.name,
        transform: () => {
          return new Date().getTime();
        }
      });
    }
  }

  return fieldTransformMap;
}
