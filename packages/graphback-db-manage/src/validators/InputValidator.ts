import { diff } from '@graphql-inspector/core';
import { GraphQLSchema } from 'graphql';
import { invalidChanges } from './IsValidChangeType';

export const validateInput = (newSchema: GraphQLSchema, oldSchema: GraphQLSchema) => {

  if (!oldSchema) {
    return;
  }

  const changes = diff(newSchema, oldSchema);

  if (invalidChanges(changes)) {
    console.log(changes);
    throw new Error("invalid change types");
  }
};
