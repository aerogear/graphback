
import { readFileSync } from 'fs';
import { GlobSync } from 'glob';
import { SchemaTemplateContext, Type } from 'graphql-codegen-core';
import * as handlebars from 'handlebars';
import { basename, join } from 'path';
import { GeneratorConfig } from '../GeneratorConfig';
import { logger } from '../logger';
import { MetadataFormat } from '../resolvers/MetadataInstance';
import { HandlebarsHelpers } from './Helpers';

/**
 * Generates human readable schema from AST
 */
export class GraphQLSchemaGenerator {
  private rootTemplate: string = `{{> schema}}`

  constructor() {
    new HandlebarsHelpers().registerHelpers();
  }

  /**
   * Generate human readable schema using context
   *
   * @param context input context that will be used to generate schema
   */
  public generateNewSchema(context: SchemaTemplateContext, resolvers: MetadataFormat, config: GeneratorConfig): string {
    this.registerPartials();
    if (!context.hasTypes) {
      logger.warn("Schema generation was executed without top level types. Generation will not return any valid results.")
    }
    const template = handlebars.compile(this.rootTemplate);

    // tslint:disable-next-line:no-any
    const input: any = context;
    input.config = config;
    input.resolvers = resolvers

    return template(input);
  }

  private registerPartials() {
    const partialsPath = join(__dirname, `partials`);
    const templates = new GlobSync('./*.handlebars', { cwd: partialsPath });
    templates.found.forEach((path: string) => {
      logger.debug("Adding new partial", path);
      // tslint:disable-next-line:no-any
      let name: any = basename(path).split('.');
      if (name.length > 0) {
        name = name[0];
      }
      const location = join(partialsPath, path);
      const content = readFileSync(location, { encoding: "UTF8" });
      handlebars.registerPartial(name, content);
    });
  }
}
