import { buildSchema, graphql, GraphQLSchema, introspectionFromSchema, IntrospectionQuery, introspectionQuery, printSchema, validate } from "graphql";
import { SchemaTemplateContext, schemaToTemplateContext } from 'graphql-codegen-core'
import { mergeSchemas } from 'graphql-tools';
import { IGraphQLConfig } from './GraphQLConfig'
import { logger } from './logger'


/**
 * Parser for schema that performs validation for basic contents
 */
export class SchemaParser {
  // Schema that should have only predefined top level types (no Queries/Mutations etc.)
  private schema: GraphQLSchema

  // Processed schema that can be used to build elements
  private schemaContext: SchemaTemplateContext

  // Schema that has additional types that are required to build AST
  private validSchema: GraphQLSchema

  // Introspection schema used to compare schemas between each other
  private introspectionSchema: IntrospectionQuery;

  public async build(schemaString: string, config: IGraphQLConfig) {
    logger.debug(`Input schema: ${schemaString}`);
    this.schema = buildSchema(schemaString);

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

    // TO FIX review if still needed
    // Stitch schema with Query type to validate it
    //this.validSchema = mergeSchemas({ schemas: [schemaString, placeHolderSchema] })
    // this.introspectionSchema = introspectionFromSchema(this.schema, { descriptions: false })
    //logger.error(`Output introspection query: ${this.introspectionSchema}`)
    // printSchema(this.schema)
    // logger.error(`schema: ${this.schema.getTypeMap()}`)
    // try {
    //   const result = await graphql(this.schema, introspectionQuery)
    //   if (result.errors) {
    //     return logger.error(`Schema has errors ${result.errors}`);
    //   }
    // } catch (err) {
    //   return  logger.error(`Error when parsing schema ${err}`);
    // }
  }


}
