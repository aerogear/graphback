import { Change, ChangeType } from '@graphql-inspector/core';
// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import { GraphQLSchemaManager, InMemoryModelProvider } from "../src/database";
import { ModelChangeType } from '../src/database/migrations/ModelChangeType';

const oldSchemaDefault = `
type User {
  id: ID!
  name: String!
}

type Note {
  id: ID!
  title: String!
}
`;

const currentSchemaDefault = `
type User {
  id: ID!
  age: Int
}

type Test {
  id: ID!
  name: String
}
`;


// TODO: Fix tests

// const setup = (oldSchemaText: string = oldSchemaDefault, newSchemaText: string = currentSchemaDefault) => {

//   const provider = new InMemoryModelProvider(oldSchemaText, newSchemaText);

//   const schemaManager = new GraphQLSchemaManager({ provider: provider });

//   return { provider, schemaManager };
// }


// ava('it should detect multiple changes', (t: ExecutionContext) => {
//   const { schemaManager } = setup();

//   const changes = schemaManager.getChanges();

//   t.assert(changes.length === 2);
//   // tslint:disable-next-line: no-null-keyword
//   t.snapshot(JSON.stringify(changes, null, 2));
// });

// ava('it should not have invalid change types', (t: ExecutionContext) => {
//   const { schemaManager } = setup();

//   const changes = schemaManager.getChanges();

//   const invalidChangeTypes = changes.filter((c: Change) => c === ModelChangeType[c.type]);

//   t.assert(invalidChangeTypes.length === 0);
// });

// ava('it should update the old schema to match the new one', (t: ExecutionContext) => {
//   const { schemaManager, provider } = setup();

//   schemaManager.updateOldSchema();

//   t.assert(provider.getCurrentSchemaText() === provider.getPreviousSchemaText());
//   t.snapshot(provider.getPreviousSchemaText());
// });
