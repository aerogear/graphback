const runtimeImportTemplate = `const { validateRuntimeContext } = require("@graphback/runtime");`

export const resolverFileTemplateJS = (name: string, outputResolvers: string[]) => {
    return `${runtimeImportTemplate}\n\n exports.${name.toLowerCase()}Resolvers = {
      ${outputResolvers.join('\n\n')}  
    }`
}

export const blankResolverJS = (resolverType: string, name: string, output: string) => {
    return `export default {
        ${resolverType}: {
            ${name}: ${output}
        }
    }`;
}
