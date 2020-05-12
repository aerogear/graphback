export function checkIsAuthorizedByRole(roles: string[], context?: any) {
  for (const role of roles) {
    if (context.kauth.hasRole(role)) {
      return true
    }
  }

  return false
}

export function isACreateResolver(info: any, modelName: string) {
  return info.fieldName === `create${modelName}`
}

export function isMutation(info: any) {
  return info && info.parentType && info.parentType.name === "Mutation"
}

export function isQuery(info: any) {
  return info && info.parentType && info.parentType.name === "Query"
}
