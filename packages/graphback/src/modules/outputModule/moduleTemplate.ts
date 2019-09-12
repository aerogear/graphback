import { createImportString } from '../../utils';

const commonImports = [
  "import { GraphQLModule } from '@graphql-modules/core';",
];

const moduleImports = [
  "import 'graphql-import-node';",
  "import { resolvers } from './resolvers';"
];

export const generateModule = (name: string) => {
  const modelImport = createImportString(['typeDefs'], `'./${name}'`);

  // TODO: Sort imports alphabetically
  const imports = [...commonImports, ...moduleImports, modelImport];

  return `${imports.join(`\n`)}

export const ${name}Module = new GraphQLModule({
  typeDefs,
  resolvers
});
`;
}

export const generateAppModuleTemplate = (moduleNames: string[]) => {

  const imports = moduleNames.map((m: string) => createImportString([`${m}Module`], `'./${m.toLowerCase()}'`))

  return `${[...commonImports, ...imports].join(`\n`)}

export const AppModule = new GraphQLModule({
  imports: [
    ${moduleNames.map((m: string) => `${m}Module`).join(`,\n    `)}
  ]
});
`;
}
