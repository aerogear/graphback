
import { readFileSync } from 'fs';
import { GlobSync } from 'glob';
import { SchemaTemplateContext, Type } from 'graphql-codegen-core';
import * as handlebars from 'handlebars';
import { basename, join } from 'path';
import { IGraphQLConfig } from '../GraphQLConfig';
import { logger } from '../logger';
import { ResolverInstance } from '../resolvers/ResolverInstance';

/**
 * Generates human readable schema from AST
 */
export class GraphQLSchemaGenerator {

  constructor() {
    // tslint:disable-next-line:cyclomatic-complexity no-any
    handlebars.registerHelper('ifCond', function(v1: any, operator: string, v2: any, options: any) {
      switch (operator) {
        case '==':
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case '===':
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case '!=':
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case '!==':
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case '<':
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case '<=':
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case '>':
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case '>=':
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case '&&':
          return v1 && v2 ? options.fn(this) : options.inverse(this);
        case '||':
          return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    });

    handlebars.registerHelper('ifQuery', (context: SchemaTemplateContext, options: { inverse: Function; fn: Function }) => {
      if (context && context.types) {
        const filteredType = context.types.filter((gqlType: Type) => {
          return gqlType.name.toLowerCase() === "query"
        });

        if (filteredType && filteredType[0]) {
          return options && options.fn ? options.fn(context) : '';
        } else {
          return options && options.inverse ? options.inverse(context) : '';
        }
      }

      return options && options.inverse ? options.inverse(context) : '';
    });

    handlebars.registerHelper('ifMutation', (context: SchemaTemplateContext, options: { inverse: Function; fn: Function }) => {
      if (context && context.types) {
        const filteredType = context.types.filter((gqlType: Type) => {
          return gqlType.name.toLowerCase() === "mutation"
        });

        if (filteredType && filteredType[0]) {
          return options && options.fn ? options.fn(context) : '';
        } else {
          return options && options.inverse ? options.inverse(context) : '';
        }
      }

      return options && options.inverse ? options.inverse(context) : '';
    });

    handlebars.registerHelper('ifSubscription', (context: SchemaTemplateContext, options: { inverse: Function; fn: Function }
    ) => {
      if (context && context.types) {
        const filteredType = context.types.filter((gqlType: Type) => {
          return gqlType.name.toLowerCase() === "subscription"
        });

        if (filteredType && filteredType[0]) {
          return options && options.fn ? options.fn(context) : '';
        } else {
          return options && options.inverse ? options.inverse(context) : '';
        }
      }

      return options && options.inverse ? options.inverse(context) : '';
    });

    // tslint:disable-next-line:no-any
    handlebars.registerHelper('ifDirective', (context: any, directiveName: string, options: { inverse: Function; fn: Function }
    ) => {
      if (context && context.directives && directiveName && typeof directiveName === 'string') {
        const directives = context.directives;
        const directiveValue = directives[directiveName];

        if (directiveValue) {
          return options && options.fn ? options.fn({ ...(directiveValue || {}), ...context }) : '';
        } else {
          return options && options.inverse ? options.inverse(context) : '';
        }
      }

      return options && options.inverse ? options.inverse(context) : '';
    });
  }

  /**
   * Generate human readable schema using context
   *
   * @param context input context that will be used to generate schema
   */
  public generateNewSchema(context: SchemaTemplateContext, resolvers: ResolverInstance[], config: IGraphQLConfig): string {
    const partialsPath = join(__dirname, `templates`);
    const templates = new GlobSync('./*.handlebars', { cwd: partialsPath })

    templates.found.forEach((path: string) => {
      logger.debug("Adding new partial", path)
      // tslint:disable-next-line:no-any
      let name: any = basename(path).split('.')
      if (name.length > 0) {
        name = name[0];
      }
      const location = join(partialsPath, path)
      const content = readFileSync(location, { encoding: "UTF8" });
      handlebars.registerPartial(name, content)
    });

    const rootSchema = `{{> schema}}`;
    const template = handlebars.compile(rootSchema);

    // FIXME Reorganize templates input
    // tslint:disable-next-line:no-any
    const input: any = context;
    input.config = config;
    input.resolvers = resolvers;

    return template(input);
  }
}
