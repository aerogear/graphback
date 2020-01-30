import { runtimeImportTemplate } from './apolloResolverFormatter';

export const resolverFileTemplate = (name: string, outputResolvers: string[]) => {
    return `${runtimeImportTemplate}\n\n exports.${name.toLowerCase()}Resolvers = {
      ${outputResolvers.join(',\n\n\t')}  
    }`
}