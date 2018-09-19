import { buildSchema, graphql, GraphQLObjectType, GraphQLSchema, GraphQLString, introspectionFromSchema, IntrospectionQuery, introspectionQuery, printSchema } from "graphql";
import { SchemaTemplateContext, schemaToTemplateContext } from 'graphql-codegen-core'
import { mergeSchemas } from 'graphql-tools';
import { GeneratorConfig } from '../GeneratorConfig'
import { logger } from '../logger'
import { setScheduler } from 'bluebird';


/**
 * Parser for schema that performs validation for basic contents
 */
export class SchemaParser {
  // Schema that should have only predefined top level types (no Queries/Mutations etc.)
  private schema: GraphQLSchema

  // Processed schema that can be used to build elements
  private schemaContext: SchemaTemplateContext

  // Introspection schema used to compare schemas between each other
  private introspectionSchema: IntrospectionQuery;
  private schemaText: string;

  /**
   * Creates new parser for schema text
   *
   * @param schemaText - human readable schema text
   */
  constructor(schemaText: string) {
    this.schemaText = schemaText
  }

  public async build(config: GeneratorConfig) {
    logger.debug(`Input schema: ${this.schemaText}`);
    this.schema = buildSchema(this.schemaText);

    this.schemaContext = schemaToTemplateContext(this.schema)

    return this.validate();
  }

  /**
   * Get schema context that can be used to build resolvers etc.
   */
  public getContext() {
    return this.schemaContext
  }

  private validate() {
    if (this.schemaContext.hasScalars) {
      logger.warn(`Scalars are not supported in schema generation. `);
    }
    if (this.schemaContext.hasInterfaces) {
      logger.warn(`Interfaces are not supported in schema generation`);
    }
    if (!this.schemaContext.types) {
      logger.error(`Schema is missing types that can be used in generation`);

      return Promise.reject();
    }

    let preValidationSchema = this.schema;
    // Definition has no Query type
    // To validate schema we need to merge definition with example query type
    if (!this.schema.getQueryType()) {
      const placeholderSchema = new GraphQLSchema({
        query: new GraphQLObjectType({
          name: 'RootQueryType',
          fields: {
            sample: {
              type: GraphQLString
            }
          }
        }),
      });

      preValidationSchema = mergeSchemas({
        schemas: [placeholderSchema, this.schema]
      })
    }

    this.introspectionSchema = introspectionFromSchema(preValidationSchema, { descriptions: false })

    return graphql(preValidationSchema, introspectionQuery)
  }

}
