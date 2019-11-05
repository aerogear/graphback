// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import { GraphQLSchemaManager, InMemoryModelProvider } from "../src/database";

const oldSchemaDefault = `
type User {
    id: ID!
    name: String!
}
`;

const currentSchemaDefault = `
type User {
    id: ID!
    name: String!
    age: Int
}

type Test {
    id: ID!
    name: String
}
`;

const setup = (oldSchemaText: string = oldSchemaDefault, newSchemaText: string = currentSchemaDefault) => {

  const provider = new InMemoryModelProvider(oldSchemaText, newSchemaText);

  const schemaManager = new GraphQLSchemaManager({ provider: provider });

  return { provider, schemaManager };
}


ava('it should detect multiple changes', (t: ExecutionContext) => {
  const { schemaManager } = setup();

  const changes = schemaManager.getChanges();

  t.assert(changes.length === 2);
  // tslint:disable-next-line: no-null-keyword
  t.snapshot(JSON.stringify(changes, null, 2));
});

ava('it should update the old schema to match the new one', (t: ExecutionContext) => {
  const { schemaManager, provider } = setup();

  schemaManager.updateOldSchema();

  t.assert(provider.getCurrentSchemaText() === provider.getPreviousSchemaText());
  t.snapshot(provider.getPreviousSchemaText());
});
