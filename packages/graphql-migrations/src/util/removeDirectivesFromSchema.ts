import { buildASTSchema, parse, visit } from 'graphql';

export const removeDirectivesFromSchema = (schemaText: string) => {
    const schemaAST = parse(schemaText);
    const result = visit(schemaAST, {
        //tslint:disable-next-line: no-any
        leave: (node: any) => {
            if (node.directives && node.directives.length) {
                node.directives = undefined;
            }
        }
    });

    return buildASTSchema(result);
}
