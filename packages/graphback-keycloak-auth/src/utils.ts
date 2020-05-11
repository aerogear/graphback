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
