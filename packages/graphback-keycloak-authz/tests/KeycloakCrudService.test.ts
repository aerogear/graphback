/* eslint-disable max-lines */
// eslint-disable-next-line @typescript-eslint/tslint/config
import Keycloak from 'keycloak-connect'
import { KeycloakContextBase } from 'keycloak-connect-graphql'
import { PubSub } from 'graphql-subscriptions'
import { buildSchema, GraphQLObjectType } from 'graphql'
// eslint-disable-next-line import/no-internal-modules
import { CRUDService, ModelDefinition } from '@graphback/core'
import { KeycloakCrudService, CrudServiceAuthConfig } from '../src'
import { checkAuthRulesForSelections } from '../src/utils'
import { MockDataProvider } from './mocks/MockDataProvider'



const pubSub = new PubSub()

// returned from CRUDService.findBy
// if tests ever start failing because of this,
// something probably changed in the CRUDService implementation
// around paging
const emptyPageValue = { items: [], offset: 0 }

test('unauthorized tokens will result in unauthorized errors', async () => {

  const modelType = buildSchema(`
    type Task {
      id: ID
      title: String
      description: String
    }
  `).getType('Task') as GraphQLObjectType

  const authConfig = {
    create: { roles: ['admin'] },
    read: { roles: ['admin'] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] }
  }

  const db = new MockDataProvider()

  const modelDefinition: ModelDefinition = {
    graphqlType: modelType,
    primaryKey: {
      name: 'id',
      type: 'ID'
    },
    relationships: [],
    fields: undefined,
    crudOptions: undefined
  }

  const service = new KeycloakCrudService(modelDefinition, {
    authConfig,
    service: new CRUDService(modelDefinition, db, { crudOptions: {}, pubSub })
  })

  const unauthorizedToken = {
    hasRole: (role: string) => {
      return false
    },
    isExpired: () => {
      return false
    }
  } as Keycloak.Token

  const unauthorizedContext = { kauth: new KeycloakContextBase(unauthorizedToken), graphback: { services: {} } }

  const val = { test: 'value' }

  const dbCreateSpy = jest.spyOn(db, "create")
  const dbUpdateSpy = jest.spyOn(db, "update")
  const dbDeleteSpy = jest.spyOn(db, "delete")
  const dbfindBySpy = jest.spyOn(db, "findBy")
  const dbFindOneSpy = jest.spyOn(db, "findOne")

  expect(() => service.create(val, unauthorizedContext)).toThrowError('User is not authorized.')
  expect(() => service.update(val, unauthorizedContext)).toThrowError('User is not authorized.')
  expect(() => service.delete(val, unauthorizedContext)).toThrowError('User is not authorized.')
  expect(() => service.findBy({ filter: val }, unauthorizedContext)).toThrowError('User is not authorized.')
  expect(() => service.findOne(val, unauthorizedContext)).toThrowError('User is not authorized.')

  // verify that no calls to the underlying data provider were made
  expect(dbCreateSpy).not.toHaveBeenCalled()
  expect(dbUpdateSpy).not.toHaveBeenCalled()
  expect(dbDeleteSpy).not.toHaveBeenCalled()
  expect(dbfindBySpy).not.toHaveBeenCalled()
  expect(dbFindOneSpy).not.toHaveBeenCalled()
});

test('authorized tokens will not throw an error and will get a result', async () => {

  const modelType = buildSchema(`
    type Task {
      id: ID
      title: String
      description: String
    }
  `).getType('Task') as GraphQLObjectType

  const modelDefinition: ModelDefinition = {
    graphqlType: modelType,
    primaryKey: {
      name: 'id',
      type: 'ID'
    },
    relationships: [],
    fields: undefined,
    crudOptions: undefined
  }

  const authConfig = {
    create: { roles: ['admin'] },
    read: { roles: ['admin'] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] }
  }

  const db = new MockDataProvider()

  const service = new KeycloakCrudService(modelDefinition, {
    authConfig,
    service: new CRUDService(modelDefinition, db, { crudOptions: {}, pubSub })
  })

  const authorizedToken = {
    hasRole: (role: string) => {
      return role === 'admin'
    },
    isExpired: () => {
      return false
    }
  } as Keycloak.Token


  const authorizedContext = { kauth: new KeycloakContextBase(authorizedToken), graphback: { services: {} } }

  const dbCreateSpy = jest.spyOn(db, "create")
  const dbUpdateSpy = jest.spyOn(db, "update")
  const dbDeleteSpy = jest.spyOn(db, "delete")
  const dbfindBySpy = jest.spyOn(db, "findBy")
  const dbFindOneSpy = jest.spyOn(db, "findOne")

  const val = { test: 'value' }

  await expect(service.create(val, authorizedContext)).resolves.toEqual(val)
  await expect(service.update(val, authorizedContext)).resolves.toEqual(val)
  await expect(service.delete(val, authorizedContext)).resolves.toEqual(val)
  await expect(service.findBy({ filter: val }, authorizedContext)).resolves.toEqual(emptyPageValue)
  await expect(service.findOne(val, authorizedContext)).resolves.toEqual(val)

  // verify that the calls to the underlying data provider were made
  expect(dbCreateSpy).toHaveBeenCalled()
  expect(dbUpdateSpy).toHaveBeenCalled()
  expect(dbDeleteSpy).toHaveBeenCalled()
  expect(dbfindBySpy).toHaveBeenCalled()
  expect(dbFindOneSpy).toHaveBeenCalled()
});


test('passing no authConfig will result in all operations being allowed', async () => {

  const modelType = buildSchema(`
    type Task {
      id: ID
      title: String
      description: String
    }
  `).getType('Task') as GraphQLObjectType

  const modelDefinition: ModelDefinition = {
    graphqlType: modelType,
    primaryKey: {
      name: 'id',
      type: 'ID'
    },
    relationships: [],
    fields: undefined,
    crudOptions: undefined
  }

  const authConfig = undefined

  const db = new MockDataProvider()

  const service = new KeycloakCrudService(modelDefinition, {
    authConfig,
    service: new CRUDService(modelDefinition, db, { crudOptions: {}, pubSub })
  })

  const context = { kauth: {}, graphback: { services: {} } }
  const val = { test: 'value' }

  await expect(service.create(val, context)).resolves.toEqual(val)
  await expect(service.update(val, context)).resolves.toEqual(val)
  await expect(service.delete(val, context)).resolves.toEqual(val)
  await expect(service.findBy({ filter: val }, context)).resolves.toEqual(emptyPageValue)
  await expect(service.findOne(val, context)).resolves.toEqual(val)
});

test('multiple roles can be applied to each operation', async () => {

  const modelType = buildSchema(`
    type Task {
      id: ID
      title: String
      description: String
    }
  `).getType('Task') as GraphQLObjectType

  const modelDefinition: ModelDefinition = {
    graphqlType: modelType,
    primaryKey: {
      name: 'id',
      type: 'ID'
    },
    relationships: [],
    fields: undefined,
    crudOptions: undefined
  }

  const authConfig = {
    create: { roles: ['admin', 'developer', 'user'] },
    read: { roles: ['admin', 'developer', 'user'] },
    update: { roles: ['admin', 'developer'] },
    delete: { roles: ['admin', 'developer'] }
  }


  const service = new KeycloakCrudService(modelDefinition, {
    authConfig,
    service: new CRUDService(modelDefinition, new MockDataProvider(), { crudOptions: {}, pubSub })
  })

  const Token = {
    hasRole: (role: string) => {
      return role === 'user'
    },
    isExpired: () => {
      return false
    }
  } as Keycloak.Token

  const context = { kauth: new KeycloakContextBase(Token), graphback: { services: {} } }

  const val = { test: 'value' }

  await expect(service.create(val, context)).resolves.toEqual(val)
  expect(() => service.update(val, context)).toThrowError('User is not authorized.')
  expect(() => service.delete(val, context)).toThrowError('User is not authorized.')
  await expect(service.findBy({ filter: val }, context)).resolves.toEqual(emptyPageValue)
  await expect(service.findOne(val, context)).resolves.toEqual(val)
});


test('Subscriptions', async () => {

  const modelType = buildSchema(`
    type Task {
      id: ID
      title: String
      description: String
    }
  `).getType('Task') as GraphQLObjectType

  const modelDefinition: ModelDefinition = {
    graphqlType: modelType,
    primaryKey: {
      name: 'id',
      type: 'ID'
    },
    relationships: [],
    fields: undefined,
    crudOptions: undefined
  }

  const authConfig = {
    subCreate: { roles: ['admin'] },
    subUpdate: { roles: ['admin',] },
    subDelete: { roles: ['admin'] }
  }

  const service = new KeycloakCrudService(modelDefinition, {
    authConfig,
    service: new CRUDService(modelDefinition, new MockDataProvider(), { crudOptions: {}, pubSub })
  })

  const Token = {
    hasRole: (role: string) => {
      return role === 'user'
    },
    isExpired: () => {
      return false
    }
  } as Keycloak.Token

  const context = { kauth: new KeycloakContextBase(Token), graphback: { services: {} } }

  const val = { test: 'value' }

  expect(() => service.subscribeToCreate(val, context)).toThrowError('User is not authorized.')
  expect(() => service.subscribeToDelete(val, context)).toThrowError('User is not authorized.')
  expect(() => service.subscribeToUpdate(val, context)).toThrowError('User is not authorized.')
});

test('Batching', async () => {

  const modelType = buildSchema(`
    """@model"""
    type Task {
      id: ID
      title: String
      description: String

      """ @oneToMany(field: 'task') """
      comment: Comment
    }

    """@model"""
    type Comment {
      id: ID!
      text: String
    }

  `).getType('Task') as GraphQLObjectType

  const modelDefinition: ModelDefinition = {
    graphqlType: modelType,
    primaryKey: {
      name: 'id',
      type: 'ID'
    },
    relationships: [],
    fields: undefined,
    crudOptions: undefined
  }

  const authConfig: CrudServiceAuthConfig = {
    relations: { task: { roles: ['admin'] } }
  }

  const service = new KeycloakCrudService(modelDefinition, {
    authConfig,
    service: new CRUDService(modelDefinition, new MockDataProvider(), { crudOptions: {}, pubSub })
  })

  const Token = {
    hasRole: (role: string) => {
      return role === 'user'
    },
    isExpired: () => {
      return false
    }
  } as Keycloak.Token

  const context = { kauth: new KeycloakContextBase(Token), graphback: { services: {} } }

  expect(() => service.batchLoadData('task', "test", {}, context)).toThrowError('User is not authorized.')
});

test('Input filter', async () => {

  const modelType = buildSchema(`
    type Task {
      id: ID
      title: String
      secret: String
    }
  `).getType('Task') as GraphQLObjectType

  const modelDefinition: ModelDefinition = {
    graphqlType: modelType,
    primaryKey: {
      name: 'id',
      type: 'ID'
    },
    relationships: [],
    fields: undefined,
    crudOptions: undefined
  }

  const authConfig: CrudServiceAuthConfig = {
    returnFields: { "secret": { roles: ['admin'] } },
    updateFields: { "secret": { roles: ['admin'] } }
  }

  const service = new KeycloakCrudService(modelDefinition, {
    authConfig,
    service: new CRUDService(modelDefinition, new MockDataProvider(), { crudOptions: {}, pubSub })
  })

  const Token = {
    hasRole: (role: string) => {
      return role === 'user'
    },
    isExpired: () => {
      return false
    }
  } as Keycloak.Token

  const context = { kauth: new KeycloakContextBase(Token), graphback: { services: {} } }

  expect(() => service.update({ secret: "Tasks only for admins" }, context)).toThrowError('User is not authorized.')
  expect(() => service.create({ secret: "Tasks updates only for admins" }, context)).toThrowError('User is not authorized.')
  // TODO: Mock resolve info
  expect(() => checkAuthRulesForSelections(context, authConfig, ['secret'])).toThrowError('Unauthorized to fetch: secret')
});
