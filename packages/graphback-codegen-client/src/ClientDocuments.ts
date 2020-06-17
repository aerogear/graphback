
/**
 * Represents generated templates for different operations
 */
export interface ClientDocuments {
  queries?: ClientDocument[]
  mutations?: ClientDocument[]
  fragments?: ClientDocument[]
  subscriptions?: ClientDocument[]
}

export interface ClientDocument {
  name: string
  implementation: string
}