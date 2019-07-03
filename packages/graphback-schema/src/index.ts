import { codegen } from '@graphql-codegen/core'
import { Types } from '@graphql-codegen/plugin-helpers';
import { buildSchema, DocumentNode, GraphQLSchema, parse, printSchema } from 'graphql';
import { plugin } from './plugin'

/**
 * generate schema using graphql-codegen and visitor pattern
 * using string templates
 */
class SchemaGenerator {
  private schema: GraphQLSchema
  private parsedSchema: DocumentNode
  private config: Types.GenerateOptions
  private output: string

  /**
   * Set config for graphql-codegen
   * @param schemaText schema input as text
   */
  constructor(schemaText: string) {
    this.schema = buildSchema(schemaText)
    this.parsedSchema = parse(printSchema(this.schema))
    this.config = {
      filename: '',
      schema: this.parsedSchema,
      plugins: [
        {schema: {}}
      ],
      config: {},
      documents: [],
      pluginMap: {
        schema: {
          plugin: plugin
        }
      }
    }
  }

  /**
   * Generate output schema as string
   */
  public async generate() {
    this.output = await codegen(this.config)
    
    return this.output
  }
}