// import { readFileSync } from 'fs';
// import { buildSchema, introspectionFromSchema, parse } from 'graphql';
// import { mergeSchemas } from 'graphql-tools';
// import { join } from 'path';
// import { GraphQLBackend } from "../src/GraphQLBackend";


// /**
//  * There are four formats the schema can be in:
//  * 1. GraphQLSchema object
//  * 2. Text (the GraphQL schema language textual format)
//  * 3. AST (the GraphQL schema language textual format parsed into an AST)
//  *
//  * This file imports the textual and introspection json files and
//  * exports all four formats to be used in tests.
//  */


// const schemaText = readFileSync(join(__dirname, './Note.graphql'), 'utf8');
// const schemaObject = buildSchema(schemaText);
// const querySchema = buildSchema(`
//   type Query {
//     placeholder: String
//   }
// `)
// const validSchema = mergeSchemas({schemas: [schemaObject, querySchema]})
// const introspection = introspectionFromSchema(validSchema, { descriptions: true });
// const schemaAst = parse(schemaText);

// const types = validSchema.getPossibleTypes();
// console.log(types);

// console.info(`

// -- Introspection
// ${JSON.stringify(introspection.__schema)}

// schemaObject ----------------------

// ${schemaObject}

// AST --------------------
// ${schemaAst}

// `);

// // //schemaObject.getType("Note").getFields()

// const backend = new GraphQLBackend(schemaText);

// backend.registerResolver();

// ## graphql-code-generator spike

// Generate full schema
import { buildSchema} from 'graphql';
import { generate } from 'graphql-code-generator';
import { join } from 'path';
//import { mergeSchemas } from 'graphql-tools';

async function generateAll(){
  const generatedFiles = generate({
    template: join(__dirname,`./templates/schema-template`),
    overwrite: true,
    skipDocuments: true,
    schema:  join(__dirname,`./Note.graphql`),
    out:  join(__dirname,`/generated/schema.graphql`)
  }, true);

  const result = await generatedFiles;
  const generatedSchema = result[0].content;
  console.log(generatedSchema);

 const schemaObject = buildSchema(generatedSchema);
 console.log(schemaObject);
//  const validSchema = mergeSchemas({schemas: [schemaObject, querySchema]})
//  validSchema.getQueryType();

  // TODO VALIDATE SCHEMA

  // const generatedResolvers = await generate({
  //   //template: 'typescript',
  //   // Skip client side
  //   args: ["skip-documents "],
  //   template: `${process.cwd()}/integration-codegen/resolvers-template`,
  //   overwrite: true,
  //   schema: `${process.cwd()}/integration-codegen/Note.graphql`,
  //   out: `${process.cwd()}/integration-codegen/models/`
  // }, false);

  // console.info(generatedResolvers[0].content);


  // const generatedDDLs = await generate({
  //   //template: 'typescript',
  //   // Skip client side
  //   args: ["skip-documents "],
  //   template: `${process.cwd()}/integration-codegen/structure-template`,
  //   overwrite: true,
  //   schema: `${process.cwd()}/integration-codegen/Note.graphql`,
  //   out: `${process.cwd()}/integration-codegen/models/`
  // }, false);

  // console.info(generatedResolvers[0].content);

}

generateAll();
