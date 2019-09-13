import { createImportString } from '../../utils';
import { RelationInfo } from '../../schema/targetSchemaContext';

const commonImports = [
  "import { GraphQLModule } from '@graphql-modules/core';",
];

const commonModuleImports = [
  "import 'graphql-import-node';",
  "import { CommonModule } from '../common';",
  "import { resolvers } from './resolvers';"
];

export const generateModuleTemplate = (name: string, relations: RelationInfo[]) => {
  const moduleImports = relations.map((r: RelationInfo) => createImportString([`${r.name}Module`], `'../${r.name.toLowerCase()}'`));

  const schemaImport = createImportString(['* as typeDefs'], `'./${name}.graphql'`, true)

  // TODO: Sort imports alphabetically
  const imports = [...commonImports, ...commonModuleImports, ...moduleImports, schemaImport];

  return `${imports.join(`\n`)}

export const ${name}Module = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: [
    CommonModule,${relations.length ? relations.map((r: RelationInfo) => `\n${r.name}Module`).join(',') : ''}
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
