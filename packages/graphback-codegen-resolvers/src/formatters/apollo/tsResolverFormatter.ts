import { ResolverGeneratorPluginConfig } from '../../ResolverGeneratorPlugin';

const runtimeImportTemplate = `import { validateRuntimeContext } from "@graphback/runtime";`

export const rootResolversIndexTS = (groups: string[] = ['generated', 'custom']) => {
    return `${groups.map((name: string) => `import { ${name}Resolvers } from './${name}'`).join('\n')}
    
export const resolvers = [${groups.map((name: string) => `...${name}Resolvers`)}];`;
}

export const resolverFileTemplateTS = (outputResolvers: string[], options: ResolverGeneratorPluginConfig) => {
    const { typedImports, resolverType } = getTypedImports(options);

    return `
    ${runtimeImportTemplate}\n${typedImports}\nexport default {
      ${outputResolvers.join(',\n\n\t')}  
    }${resolverType}`
}

export const blankResolverTS = (resolverType: string, name: string, output: string, options: ResolverGeneratorPluginConfig) => {
    const { typedImports, resolverType: resolverTypeAs } = getTypedImports(options);

    return `${typedImports}\nexport default {
        ${resolverType}: {
            ${name}: ${output}
        }
    }${resolverTypeAs}`;
}

export const createResolversIndexTS = (resolverNames: string[], exportName: string = 'resolvers'): string => {
    const imports = resolverNames.map((name: string) => {
        return `import ${name}Resolvers from './${name}'`;
    }).join('\n');

    const importNames = resolverNames.map((name: string) => `${name}Resolvers`);

    return `${imports}

    export const ${exportName} = [${importNames.join(', ')}];`;
}

export const createCustomResolversIndexTS = (resolverNames: string[], exportName: string = 'resolvers'): string => {
    const imports = resolverNames.map((name: string) => {
        return `import ${name} from './${name}'`;
    }).join('\n');

    const importNames = resolverNames.map((name: string) => name);

    return `${imports}

    export const ${exportName} = [${importNames.join(', ')}];`;
}

function getTypedImports(options: ResolverGeneratorPluginConfig) {
    let resolverType = '';
    let typedImports = '';
    if (options.types) {
        resolverType = ` as ${options.types.resolverRootType};\n`;
        typedImports = `import { ${options.types.resolverRootType} } from "${options.types.resolverRootLocation}";\n`;
    }

    return { typedImports, resolverType };
}
