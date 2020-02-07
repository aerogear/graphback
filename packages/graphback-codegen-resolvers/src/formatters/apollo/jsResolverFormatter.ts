const runtimeImportTemplate = `const { validateRuntimeContext } = require("@graphback/runtime");`

export const resolverFileTemplateJS = (name: string, outputResolvers: string[]) => {
    return `${runtimeImportTemplate}\n\n exports.${name.toLowerCase()}Resolvers = {
      ${outputResolvers.join(',\n\n\t')}  
    }`
}

export const blankResolverJS = (resolverType: string, name: string, output: string) => {
    return `export default {
        ${resolverType}: {
            ${name}: ${output}
        }
    }`;
}

export const createResolversIndexJS = (resolverNames: string[], exportName: string = 'resolvers'): string => {
    const imports = resolverNames.map((name: string) => {
        return `const { ${name}Resolvers } = require('./${name}')`;
    }).join('\n');

    const importNames = resolverNames.map((name: string) => `${name}Resolvers`);

    return `${imports}

    exports.${exportName} = [${importNames.join(', ')}];`;
}

export const rootResolversIndexJS = (groups: string[] = ['generated', 'custom']) => {
    return `${groups.map((name: string) => `const { ${name}Resolvers } = require('./${name}')`).join('\n')}
    
exports.resolvers = [${groups.map((name: string) => `...${name}Resolvers`)}];`;
}

export const createCustomResolversIndexJS = (resolverNames: string[], exportName: string = 'resolvers'): string => {
    const imports = resolverNames.map((name: string) => {
        return `const { ${name} } = require('./${name}')`;
    }).join('\n');

    const importNames = resolverNames.map((name: string) => name);

    return `${imports}

    exports.${exportName} = [${importNames.join(', ')}];`;
}