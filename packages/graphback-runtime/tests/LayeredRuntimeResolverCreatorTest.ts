//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { buildSchema } from 'graphql';
import { GraphbackCoreMetadata } from '@graphback/core';
import { LayeredRuntimeResolverCreator } from '../src';

const test = _test as TestInterface<{}>;

const schema = buildSchema(`
"""
@model
"""
type Todos {
 id: ID!
 text: String 
}

"""
@model
"""
type User {
  name: String
  """
  @db.primary
  """
  username: String
}
`);


test('find Todo by text', async (t: ExecutionContext)  => {
  const metadata = new GraphbackCoreMetadata({ crudMethods: {} }, schema)
  const generator = new LayeredRuntimeResolverCreator(metadata.getModelDefinitions(), {});
  expect(generator.generate()).toMatchSnapshot();
});

