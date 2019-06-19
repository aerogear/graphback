/**
 * Template name, description and Repository information
 */
export interface Template {
  name: string
  description: string
  repo: TemplateRepository
}

/**
 * Github Repository information, uri, branch and path
 */
export interface TemplateRepository {
  uri: string
  branch: string
  path: string
}

/**
 * name of example model, content
 */
export interface GraphQLModel {
  name: string
  content: string
}