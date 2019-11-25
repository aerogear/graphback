import { InputModelTypeContext } from '@graphback/core'
import { generateJSResolvers } from '../formatters/ApolloJsResolverFormatter'
import { generateTSResolvers } from '../formatters/ApolloTsResolverFormatter'
import { ResolverGeneratorOptions } from './ResolverGeneratorOptions'
import { GeneratedResolvers } from './resolverTypes';
/**
 * Create resolvers function that 
 * @param inputContext 
 * @param options 
 */
export const createResolvers = (inputContext: InputModelTypeContext[], options: ResolverGeneratorOptions): GeneratedResolvers => {
    if (options) {
        if (options.format === 'ts') {
            return generateTSResolvers(inputContext, options)
        }
        if (options.format === 'js') {
            return generateJSResolvers(inputContext, options)
        }
    }
    throw Error("Invalid format specified. `options.format` supports only `ts` and `js` flags ");
}
