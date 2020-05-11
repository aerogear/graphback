
import { 
  ModelAuthConfigs,
  ResolverAuthConfig,
  ResolversAuthConfig,
  ModelAuthConfig,
  ModelAuthRule,
  ModelOperation
} from './definitions'


function getOperationsFromRule(rule: ModelAuthRule): ModelOperation[] {
  if (rule.operations && rule.operations.length > 0){
    return rule.operations
  }

  return ['create', 'read', 'update', 'delete']
}

function getInitialResolverConfig(model: ModelAuthConfig): ResolverAuthConfig {
  return { 
    roles: [],
    modelName: model.name
  }
}

function getModelOperationNames(operation: string, modelName: string) {
  if (operation === 'create' || operation === 'update' || operation === 'delete') {
    return {
      operationType: 'Mutation',
      operationNames: [`${operation}${modelName}`]
    }
  } else if (operation === 'read') {
    return {
      operationType: 'Query',
      operationNames: [`find${modelName}s`, `findAll${modelName}s`]
    }
  }

  return { operationType: '', operationNames: []}
}

/**
 * this function takes the resolver config that you see in fakeAuthConfig and turns it into something like this
 * { Query: {findAllTasks: { roles: [...] ownerAuth: true, ownerField, 'owner'}}, Mutation: {...}}
 * 
 * The idea is that the config matches up to each resolver in the application
 * 
 * Eventually this would probably land inside a graphback plugin
 * as part of directive/annotation parsing logic
 * Also it's really messy but it can be refactored to be more understandable
 */
export function createResolverAuthConfig(models: ModelAuthConfigs) {
  const resolverConfig = { Query: {}, Mutation: {} } as ResolversAuthConfig

  for (const model of models) {
    const modelAuthConfig = model.auth
    if (modelAuthConfig && modelAuthConfig.rules.length > 0) {
      for (const rule of modelAuthConfig.rules) {
        for (const operation of getOperationsFromRule(rule)) {
          // get the graphql operation Type (Query, Mutation, Subscription) and 
          // the operations this rule applies to e.g. [findTask and findAllTasks]
          const { operationType, operationNames } = getModelOperationNames(operation, model.name)
          // For each graphql operation, apply the rule to the config
          if (operationType && operationNames){
            for (const operationName of operationNames) {
              resolverConfig[operationType][operationName] = resolverConfig[operationType][operationName] || getInitialResolverConfig(model)
              if (rule.allow === 'role' && rule.roles) {
                for (const role of rule.roles) {
                  if (!resolverConfig[operationType][operationName].roles.includes(role)) {
                    resolverConfig[operationType][operationName].roles.push(role)
                  }
                }
              } else if (rule.allow === 'owner') {
                resolverConfig[operationType][operationName].ownerAuth = true
                resolverConfig[operationType][operationName].ownerField = rule.ownerField || 'owner'
              }
            }
          }
        }
      }
    }
  }

  return resolverConfig
}
