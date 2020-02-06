
export declare type SupportedLayoutTypes = 'graphql' | 'apollo';

/**
 * Format resolver object to desired pattern
 * @param crudResolvers 
 * @param layout 
 */
export const layoutResolvers = (crudResolvers: any[], layout: SupportedLayoutTypes) => {
    if (layout === 'apollo') {
        return crudResolvers;
    } else {
        Object.keys(crudResolvers).reduce((resolvers, key) => {
            if (key === 'Query' || key === 'Mutation' || key === 'Subscription') {
                return Object.assign(resolvers, { ...crudResolvers[key] })
            }
            resolvers[key] = crudResolvers[key];
        }, {});
    }
}