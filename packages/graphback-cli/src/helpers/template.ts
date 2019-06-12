export interface Template {
  name: string
  description: string
  repo: TemplateRepository
}

export interface TemplateRepository {
  uri: string
  branch: string
  path: string
}

export const allTemplates: Template[] = [
  {
    name: 'apollo-starter-ts',
    description: 'Basic apollo template in typescript',
    repo: {
      uri: 'https://github.com/aerogear/graphback',
      branch: 'master',
      path: '/templates/apollo-starter-ts',
    }
  }
]