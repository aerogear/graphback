//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { buildSchema, GraphQLObjectType } from 'graphql';
import { buildModelTableMap } from '../src/db/buildModelTableMap';
import { getDatabaseArguments } from '../src/db/dataMapper';

test('should map to default ID field', () => {
    const schema = buildSchema(`
    """
    @model
    """
    type User {
        id: ID!
        name: String
        email: String
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    const modelTableMap = buildModelTableMap(userModel);

    const data = {
        id: 1,
        email: 'johndoe@gmail.com',
        name: 'John Doe',
    }

    const args = getDatabaseArguments(modelTableMap, data);

    expect(args.idField).toEqual({ name: 'id', value: 1 })
});

test('should map to default custom ID field from annotations', () => {
    const schema = buildSchema(`
    """
    @model
    """
    type User {
        id: ID!
        name: String
        """
        @id
        """
        email: String
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    const modelTableMap = buildModelTableMap(userModel);

    const data = {
        id: 1,
        email: 'johndoe@gmail.com',
        name: 'John Doe',
    }

    const args = getDatabaseArguments(modelTableMap, data);

    expect(args.idField).toEqual({ name: 'email', value: 'johndoe@gmail.com' })
});

test('should stringify object values', () => {
  const schema = buildSchema(`
  """
  @model
  """
  type User {
    id: ID!
    name: String
    profile: Profile
  }

  type Profile {
    email: String
  }

  `);

  const userModel = schema.getType("User") as GraphQLObjectType;

  const modelTableMap = buildModelTableMap(userModel);

  const data = {
      id: 1,
      profile: {
        email: 'johndoe@gmail.com',
      },
      name: null
  }

  const { data: mappedData } = getDatabaseArguments(modelTableMap, data);

  expect(mappedData).toEqual({ id: 1, name: null, profile: JSON.stringify(data.profile) })
});
