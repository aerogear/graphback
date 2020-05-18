
import Keycloak from 'keycloak-connect'
import { KeycloakContextBase } from 'keycloak-connect-graphql'
import { KeycloakCrudService } from '../src'
import { MockDataProvider } from './mocks/MockDataProvider'
import { PubSub } from 'graphql-subscriptions'
import { buildSchema, GraphQLObjectType } from 'graphql'

const subscriptionConfig = {
  publishCreate: true,
  publishUpdate: true,
  publishDelete: true,
  pubSub: new PubSub()
}

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

  const service = new KeycloakCrudService({
    db,
    authConfig,
    subscriptionConfig,
    modelType
  })

  const unauthorizedToken = {
    hasRole: (role: string) => {
      return false
    },
    isExpired: () => {
      return false
    }
  } as Keycloak.Token

  const unauthorizedContext = { kauth: new KeycloakContextBase(unauthorizedToken) }

  const val = {test: 'value'}

  const dbCreateSpy = jest.spyOn(db, "create")
  const dbUpdateSpy = jest.spyOn(db, "update")
  const dbDeleteSpy = jest.spyOn(db, "delete")
  const dbfindBySpy = jest.spyOn(db, "findBy")
  const dbFindAllSpy = jest.spyOn(db, "findAll")

  expect(() => service.create(val, unauthorizedContext)).toThrowError('User is not authorized.')
  expect(() => service.update(val, unauthorizedContext)).toThrowError('User is not authorized.')
  expect(() => service.delete(val, unauthorizedContext)).toThrowError('User is not authorized.')
  expect(() => service.findBy(val, unauthorizedContext)).toThrowError('User is not authorized.')
  expect(() => service.findAll(unauthorizedContext)).toThrowError('User is not authorized.')

  // verify that no calls to the underlying data provider were made
  expect(dbCreateSpy).not.toHaveBeenCalled()
  expect(dbUpdateSpy).not.toHaveBeenCalled()
  expect(dbDeleteSpy).not.toHaveBeenCalled()
  expect(dbfindBySpy).not.toHaveBeenCalled()
  expect(dbFindAllSpy).not.toHaveBeenCalled()
});

test('authorized tokens will not throw an error and will get a result', async () => {
  
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

  const service = new KeycloakCrudService({
    db,
    authConfig,
    subscriptionConfig,
    modelType
  })

  const authorizedToken = {
    hasRole: (role: string) => {
      return role === 'admin'
    },
    isExpired: () => {
      return false
    }
  } as Keycloak.Token


  const authorizedContext = { kauth: new KeycloakContextBase(authorizedToken) }

  const dbCreateSpy = jest.spyOn(db, "create")
  const dbUpdateSpy = jest.spyOn(db, "update")
  const dbDeleteSpy = jest.spyOn(db, "delete")
  const dbfindBySpy = jest.spyOn(db, "findBy")
  const dbFindAllSpy = jest.spyOn(db, "findAll")

  const val = {test: 'value'}

  await expect(service.create(val, authorizedContext)).resolves.toEqual(val)
  await expect(service.update(val, authorizedContext)).resolves.toEqual(val)
  await expect(service.delete(val, authorizedContext)).resolves.toEqual(val)
  await expect(service.findBy(val, authorizedContext)).resolves.toEqual([])
  await expect(service.findAll(authorizedContext)).resolves.toEqual([])

  // verify that the calls to the underlying data provider were made
  expect(dbCreateSpy).toHaveBeenCalled()
  expect(dbUpdateSpy).toHaveBeenCalled()
  expect(dbDeleteSpy).toHaveBeenCalled()
  expect(dbfindBySpy).toHaveBeenCalled()
  expect(dbFindAllSpy).toHaveBeenCalled()
});


test('passing no authConfig will result in all operations being allowed', async () => {
  
  const modelType = buildSchema(`
    type Task {
      id: ID
      title: String
      description: String
    }
  `).getType('Task') as GraphQLObjectType
  
  const authConfig = undefined

  const db = new MockDataProvider()

  const service = new KeycloakCrudService({
    db,
    authConfig,
    subscriptionConfig,
    modelType
  })

  const context = { kauth: {} }
  const val = {test: 'value'}

  await expect(service.create(val, context)).resolves.toEqual(val)
  await expect(service.update(val, context)).resolves.toEqual(val)
  await expect(service.delete(val, context)).resolves.toEqual(val)
  await expect(service.findBy(val, context)).resolves.toEqual([])
  await expect(service.findAll(context)).resolves.toEqual([])
});

test('multiple roles can be applied to each operation', async () => {
  
  const modelType = buildSchema(`
    type Task {
      id: ID
      title: String
      description: String
    }
  `).getType('Task') as GraphQLObjectType
  
  const authConfig = {
    create: { roles: ['admin', 'developer', 'user'] },
    read: { roles: ['admin', 'developer', 'user'] },
    update: { roles: ['admin', 'developer'] },
    delete: { roles: ['admin', 'developer'] }
  }

  const service = new KeycloakCrudService({
    db: new MockDataProvider(),
    authConfig,
    subscriptionConfig,
    modelType
  })

  const Token = {
    hasRole: (role: string) => {
      return role === 'user'
    },
    isExpired: () => {
      return false
    }
  } as Keycloak.Token

  const context = { kauth: new KeycloakContextBase(Token) }

  const val = {test: 'value'}

  await expect(service.create(val, context)).resolves.toEqual(val)
  expect(() => service.update(val, context)).toThrowError('User is not authorized.')
  expect(() => service.delete(val, context)).toThrowError('User is not authorized.')
  await expect(service.findBy(val, context)).resolves.toEqual([])
  await expect(service.findAll(context)).resolves.toEqual([])
});