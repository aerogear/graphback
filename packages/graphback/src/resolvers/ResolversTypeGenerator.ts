import { codegen } from '@graphql-codegen/core'
import { Types } from '@graphql-codegen/plugin-helpers';
import { plugin as typescriptPlugin } from '@graphql-codegen/typescript';
import { plugin as typescriptResolversPlugin } from '@graphql-codegen/typescript-resolvers'
import { buildSchema, DocumentNode, GraphQLSchema, parse, printSchema } from 'graphql';

/**
 * Generate Resolver Types from the generated schema
 * which is prepended to the output resolver file
 */
export class ResolverTypeGenerator {
  private schema: GraphQLSchema
  private parsedSchema: DocumentNode
  private config: Types.GenerateOptions

  /**
   * Create config for generating Resolver Types
   * @param schemaText output schema generated
   */
  constructor(schemaText: string) {
    this.schema = buildSchema(schemaText)
    this.parsedSchema = parse(printSchema(this.schema))
    this.config = {
      filename: '',
      schema: this.parsedSchema,
      plugins: [
        {typescript: {}},
        {typescriptResolvers: {}} // Here you can pass configuration to the plugin
      ],
      config: {},
      documents: [],
      pluginMap: {
        typescript: {
          plugin: typescriptPlugin
        },
        typescriptResolvers: {
          plugin: typescriptResolversPlugin
        }
      }
    }
  }

  public async generateTypes(): Promise<string> {
    // tslint:disable-next-line: no-unnecessary-local-variable
    const types: string = await codegen(this.config)
    
    return types
  }
}

