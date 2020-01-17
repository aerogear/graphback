import { GraphQLSchema } from "graphql";

interface SchemaTransformer<TransformerConfig = any> {

    /**
     * Performs transformation on the schema and returns target schemaƒ
     * @param schema 
     */
    transformSchema?(schema: GraphQLSchema, config: TransformerConfig): GraphQLSchema;
};