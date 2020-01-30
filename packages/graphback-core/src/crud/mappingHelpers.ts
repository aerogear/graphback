import { GraphbackOperationType} from '.';

// TODO is is esential to document this element
export const getFieldName = (typeName: string, action: GraphbackOperationType, plural: string = ''): string => {
  const upperCasedType = typeName.charAt(0).toUpperCase() + typeName.substr(1);

  return `${action}${upperCasedType}${plural}`
}

export const getTableName = (typeName: string): string => {
  return typeName.toLowerCase()
}

export const getIdFieldName = (typeName: string): string => {
  return 'id'// TODO
}

// TODO use everywhere
export const getSubscriptionName = (typeName: string,  action: GraphbackOperationType, ): string => {
  return 'id'// TODO
}

// tslint:disable-next-line: no-reserved-keywords
export function getRelationFieldName(field: any, type: any) {
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

function lowerCaseFirstChar(text: string) {
  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}