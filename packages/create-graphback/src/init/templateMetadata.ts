/**
 * Template name, description and Repository information
 */
export interface Template {
  name: string
  description: string
  repos: TemplateRepository[]
  // If disabled, this template will not be available to select in CLI
  disabled?: boolean
}

/**
 * Github Repository information, uri, branch and path
 */
export interface TemplateRepository {
  // Repository uri
  uri: string
  // Git branch
  branch: string
  // Path within git repository 
  path: string
  // Location to mount specific template (`./` by default)
  mountpath?: string
}

/**
 * name of example model, content
 */
export interface GraphQLModel {
  name: string
  content: string
}