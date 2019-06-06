import { readFileSync } from 'fs';
import { GlobSync } from 'glob';
import * as handlebars from 'handlebars';
import { basename, join } from 'path';
import { ResolverInstance } from '../resolvers/ResolverInstance';
import { HandlebarsHelpers } from '../schema/Helpers';

/**
 * Generate Typescript compatible schema
 */
export class GraphQLResolverGenerator {
  private rootTemplate: string = `{{> resolvers}}`

  /**
   * Register helper functions for Handlebars
   */
  constructor() {
    new HandlebarsHelpers().registerHelpers()
  }

  /**
   * Generate Typescript compatible schema
   * @param resolvers Array of ResolverInstance
   */
  public generateResolvers(resolvers: ResolverInstance[]): string {
    this.registerPartials()

    const template = handlebars.compile(this.rootTemplate)
    
    const input: any = {}
    input.resolvers = this.splitByTypes(resolvers)

    return template(input)
  }

  // TODO remove this.
  /**
   * Split resolvers into Query and Mutations
   * @param resolvers Array of ResolverInstance
   */
  private splitByTypes(resolvers: ResolverInstance[]) {
    const computedResolvers = { query: [], mutation: [] };
    computedResolvers.mutation = resolvers.filter((value: ResolverInstance) => {
      return value.resolverType === "Mutation"
    })
    computedResolvers.query = resolvers.filter((value: ResolverInstance) => {
      return value.resolverType === "Query"
    })

    return computedResolvers;
  }

  /**
   * Read partials for the template
   */
  private registerPartials() {
    const partialsPath = join(__dirname, `partials`);
    const templates = new GlobSync('./*.handlebars', { cwd: partialsPath });
    templates.found.forEach((path: string) => {
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