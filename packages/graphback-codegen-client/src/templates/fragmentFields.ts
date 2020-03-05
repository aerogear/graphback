import { getNamedType, GraphQLObjectType, isCompositeType } from 'graphql';
import { removeBlankLines } from '../helpers/removeBlankLines';

/**
 * For given type - it returns list of the type fields that 
 * can be used for building GraphQL Fragment
 * 
 * 
 * @param t type that is going to be used 
 * @param level nested level (supports only 0, 1 nested level)
 */
export function buildReturnFields(t: GraphQLObjectType, level?: number) {
  const fieldsMap = t.getFields();
  if (level > 1) {
    throw new Error("Function supports only 1 nested level")
  }

  //tslint:disable-next-line: typedef
  return Object.keys(fieldsMap).reduce((data, key) => {
    const field = fieldsMap[key];
    const modelType = getNamedType(field.type);
    if (isCompositeType(modelType)) {
      if (level !== 0) {
        data.push({
          [field.name]: buildReturnFields(modelType as GraphQLObjectType, level - 1)
        });
      }

      //Nested relation that should not be included
      return data;
    }
    data.push(field.name);

    return data;
  }, []);
}

export const printReturnFields = (resultArray: any[], shift: string = '') => {
  let resultString = '';

  for (const element of resultArray) {
    if (element instanceof Object) {
      const key = Object.keys(element)[0];
      const nestedElements = printReturnFields(element[key], '   ')
      resultString += `\n   ${key} {\n${nestedElements}   }`
    } else {
      resultString += `${shift}   ${element}\n`;
    }
  }

  return removeBlankLines(resultString);
}