const commonImports = [
  "import { GraphQLModule } from '@graphql-modules/core';",
];

const moduleImports = [
  "import 'graphql-import-node';",
  "import { typeDefs } from './model';",
  "import { resolvers } from './resolvers';"
];

const appImports = [
  "import { DefaultModule } from './default'"
];

export const generateModule = () => {
  return `${[...commonImports, ...moduleImports].join(`\n`)}

export const DefaultModule = new GraphQLModule({
  typeDefs,
  resolvers
});
`;
}

export const generateAppModule = () => {
  return `${[...commonImports, ...appImports].join(`\n`)}

export const AppModule = new GraphQLModule({
  imports: [
    DefaultModule
  ]
});
`;
}
