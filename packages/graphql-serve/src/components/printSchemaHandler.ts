import { GraphbackRuntime } from 'graphback'
import { printSchema } from 'graphql';
import { getGraphbackServerConfig } from "../GraphbackServerConfig";
import { loadSchema }  from '../loadSchema';

export const printSchemaHandler = async (argv: {model?: string}) => {
    const graphbackServerConfig = await getGraphbackServerConfig({ modeldir: argv.model });

    const graphbackConfig = graphbackServerConfig.graphback;
    const schemaText = loadSchema(graphbackConfig.model);

    const runtimeEngine = new GraphbackRuntime(schemaText, graphbackConfig);

    const schema = runtimeEngine.getMetadata().getSchema();

    console.log("Generated schema:\n");
    console.log(printSchema(schema));
}