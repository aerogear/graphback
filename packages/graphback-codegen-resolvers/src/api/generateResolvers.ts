import { InputModelTypeContext } from '@graphback/core'
import { generateJSResolvers } from '../formatters/ApolloJsResolverFormatter'
import { generateTSResolvers } from '../formatters/ApolloTsResolverFormatter'
import { ResolverGeneratorOptions } from './ResolverGeneratorOptions'


export const generateResolvers = (inputContext: InputModelTypeContext[], options: ResolverGeneratorOptions) => {
    if (options.format === 'ts') {
        return generateTSResolvers(inputContext, options)
    }
    if (options.format === 'js') {
        return generateJSResolvers(inputContext, options)
    }

    return generateTSResolvers(inputContext, options)
}
