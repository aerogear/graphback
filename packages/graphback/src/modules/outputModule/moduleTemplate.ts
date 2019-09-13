import { createImportString } from '../../utils';

const commonImports = [
  "import { GraphQLModule } from '@graphql-modules/core';",
];

const moduleImports = [
  "import { importSchema } from 'graphql-import';",
  "import { CommonModule } from '../common';",
  "import { resolvers } from './resolvers';"
];

export const generateModule = (name: string) => {
  // TODO: Sort imports alphabetically
  const imports = [...commonImports, ...moduleImports];

  return `${imports.join(`\n`)}

export const ${name}Module = new GraphQLModule({
  typeDefs: importSchema(__dirname + '/${name}.graphql'),
  resolvers,
  imports: [
    CommonModule
  ]
});
`;
}

export const generateAppModuleTemplate = (moduleNames: string[]) => {
  const imports = moduleNames.map((m: string) => createImportString([`${m}Module`], `'./${m.toLowerCase()}'`))

  return `${[...commonImports, ...imports].join(`\n`)}

export const AppModule = new GraphQLModule({
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  imports: [
    ${moduleNames.map((m: string) => `${m}Module`).join(`,\n    `)}
  ]
});
`;
}

export const generateCommonModuleTemplate = () => {
  return `
${commonImports.map((i: string) => i).join('\n')}
import config from '../../config/config';
import { connect } from '../../db';
import { pubsub } from '../../subscriptions';

export const CommonModule = new GraphQLModule({
  async context(session, context, info) {
    return {
      req: session.req,
      db: await connect(config.db),
      pubsub
    }
  },
});
`
}
