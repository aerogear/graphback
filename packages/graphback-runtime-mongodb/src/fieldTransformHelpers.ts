import { parseAnnotations, parseMarker } from "graphql-metadata";
import { GraphQLObjectType } from 'graphql';

export type FieldTransformer = (value?: any) => any;

export interface FieldTransform {
    fieldName: string,
    transformType: TransformType,
    transform: FieldTransformer
}

export enum TransformType {
    UPDATE,
    CREATE
}

export function getFieldTransformations(baseType: GraphQLObjectType) {
    const fieldMap = baseType.getFields();
    const fieldTransforms : FieldTransform[] = [];
    for (const field of Object.values(fieldMap)) {
        if (field.description?.includes("@updatedAt")) {
            fieldTransforms.push({
                fieldName: field.name,
                transformType: TransformType.UPDATE,
                transform: () => {
                    return new Date().getTime();
                }
            });
            fieldTransforms.push({
                fieldName: field.name,
                transformType: TransformType.CREATE,
                transform: () => {
                    return new Date().getTime();
                }
            });
        }
        if (field.description?.includes("@createdAt")) {
            fieldTransforms.push({
                fieldName: field.name,
                transformType: TransformType.CREATE,
                transform: () => {
                    return new Date().getTime();
                }
            });
        }
    }

    return fieldTransforms;
}