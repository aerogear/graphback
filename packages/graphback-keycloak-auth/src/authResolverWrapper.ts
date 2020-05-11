
import { 
  checkIsAuthorizedByRole,
  isACreateResolver
} from './utils';

/**
 * 
 * Wrap a specific resolver with the auth wrapper resolver
 * This has the actual auth prototype implementation
 * 
 * The wrapResolversWithAuth function below calls this function
 * for each resolver
 * 
 * @param resolverAuthInfo the config for a specific resolver
 * @param resolveFn the original resolver function
 * 
 */
export function authResolverWrapper(resolverAuthInfo: any, resolveFn: any): any {
  return async function resolve(obj: any, args: any, context: any, info: any) {
    let isAuthorizedByRole = false;
    let isAuthorizedOwner = false;
    
    // perform the role checks
    if (resolverAuthInfo.roles && resolverAuthInfo.roles.length > 0) {
      isAuthorizedByRole = checkIsAuthorizedByRole(resolverAuthInfo.roles, context)
    }
    // perform the owner auth checks
    if (resolverAuthInfo.ownerAuth) {
      const ownerField = resolverAuthInfo.ownerField
      const modelName = resolverAuthInfo.modelName

      // if we're in a create type resolver then the user is allowed to proceed
      if (isACreateResolver(info, modelName)) {
        isAuthorizedOwner = true
        // set the owner field as the currently logged in user's ID
        args.input[ownerField] = args.input[ownerField] || context.kauth.accessToken.content.sub
      } else {
        // fetch the data they're trying to modify and match the logged in user ID
        // against the record they are trying to modify
        // I see no other database agnostic/generic way to do this
        // In the future, caching could be added on the CRUDService layer to help this specific case
        // and performance in general
        const crudService = context[modelName]
        const result = await crudService.findBy({ id: args.input.id })
        const itemToUpdate = result[0]
        if (itemToUpdate && itemToUpdate[ownerField] && itemToUpdate[ownerField] === context.kauth.accessToken.content.sub) {
          isAuthorizedOwner = true
        }
      }
    }
    console.log(`resolvername: ${info.fieldName}, is authorized by role: ${isAuthorizedByRole}, is an authorized owner: ${isAuthorizedOwner}`)
    // if either one is true then the user can proceed
    if (isAuthorizedByRole || isAuthorizedOwner) {
      return resolveFn(obj, args, context, info)
    }
    // throw generic unauthorized error - good for security
    throw new Error(`User is not authorized.`)
  }
}
