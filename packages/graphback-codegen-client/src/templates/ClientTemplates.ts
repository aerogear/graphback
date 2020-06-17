

export interface ClientTemplate {
  name: string;
  implementation: string;
}

/**
 * Represets output of the client template generators
 */
export interface ClientTemplates {
  fragments: ClientTemplate[];
  queries: ClientTemplate[];
  mutations: ClientTemplate[];
  subscriptions: ClientTemplate[];
}