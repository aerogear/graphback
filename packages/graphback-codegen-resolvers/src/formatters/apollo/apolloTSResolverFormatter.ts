import { ResolverGeneratorPluginOptions } from '../../plugins/ResolverGeneratorPlugin';
import { runtimeImportTemplate } from './apolloResolverFormatter';

export const resolversRootIndexTemplate = (groups: string[] = ['generated', 'custom']) => {
    return `${groups.map((name: string) => `import { ${name}Resolvers } from './${name}'`).join('\n')}
    
export const resolvers = [${groups.map((name: string) => `...${name}Resolvers`)}];`;
}

export const resolverFileTemplate = (outputResolvers: string[], options: ResolverGeneratorPluginOptions) => {
    let resolverType = '';
    let typedImports = '';
    if (options.types) {
        resolverType = ` as ${options.types.resolverRootType}`;
        typedImports = `import { ${options.types.resolverRootType} } from "${options.types.resolverRootLocation}\n"`;
    }

    return `${runtimeImportTemplate}\n${typedImports}\nexport default {
      ${outputResolvers.join(',\n\n\t')}  
    }${resolverType}`
}