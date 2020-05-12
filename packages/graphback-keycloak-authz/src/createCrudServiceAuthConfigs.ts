import { CrudServiceAuthConfig } from './definitions';
import { getEmptyServiceConfig, getOperationsFromRule } from './utils';
import { ModelAuthConfigs } from '.';

/**
 * Convert global auth config supplied by the user into a set of configs that can be applied
 * to each model's CRUD Service
 * 
 * Done in this way so that the user facing config can support 
 * additional features such as owner based auth in the future without severe breaking changes
 * 
 * @param models The model configs that contain auth rules for each model
 */
export function createCrudServiceAuthConfigs(models: ModelAuthConfigs): CrudServiceAuthConfig {
  const serviceConfigs = {} as CrudServiceAuthConfig;

  for (const model of models) {
    const rules = model.auth && model.auth.rules;
    if (rules && rules.length > 0) {
      serviceConfigs[model.name] = getEmptyServiceConfig();
      for (const rule of rules) {
        const operations = getOperationsFromRule(rule);
        if (rule.allow && rule.allow === 'role' && rule.roles && rule.roles.length > 0) {
          for (const role of rule.roles) {
            for (const operation of operations) {
              if (!serviceConfigs[model.name][operation].roles.includes(role)) {
                serviceConfigs[model.name][operation].roles.push(role);
              }
            }
          }
        }
      }
    }
  }

  return serviceConfigs;
}
