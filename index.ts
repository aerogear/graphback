
// Generate full schema
import { buildSchema} from 'graphql';
import { generate } from 'graphql-code-generator';
import { join } from 'path';

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

 const queryType = schemaObject.getQueryType()
 const queryFields = queryType.getFields()
 if(queryFields){
  Object.keys(queryFields).forEach(
    allNote
  )
 }
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
