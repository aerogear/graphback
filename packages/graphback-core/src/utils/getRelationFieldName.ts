import { InputModelFieldContext, InputModelTypeContext } from '../api';
import { lowerCaseFirstChar } from './lowerCaseFirstChar';

// tslint:disable-next-line: no-reserved-keywords
export function getRelationFieldName(field: InputModelFieldContext, type: InputModelTypeContext) {
  let fieldName: string;
  if (field.annotations.OneToOne) {
    fieldName = field.annotations.OneToOne.field;
  }
  else if (field.annotations.ManyToOne) {
    fieldName = field.annotations.ManyToOne.field;
  }
  else if (field.annotations.OneToMany) {
    fieldName = field.annotations.OneToMany.field;
  }
  else {
    fieldName = lowerCaseFirstChar(type.name);
  }

  return fieldName;
}

