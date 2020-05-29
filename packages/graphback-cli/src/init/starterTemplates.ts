import { createWriteStream } from 'fs'
import chalk from 'chalk';
import ora from 'ora'
import * as github from 'parse-github-url'
import * as request from 'request'
import * as tar from 'tar'
import * as tmp from 'tmp'
import { Template } from './templateMetadata'

/**
 * available templates
 */
export const allTemplates: Template[] = [
  {
    name: 'apollo-fullstack-react-postgres-ts',
    description: 'Apollo GraphQL Server connecting to Postgres database and React client using TypeScript',
    repos: [{
      uri: 'https://github.com/aerogear/graphback',
      branch: 'templates-0.14.0',
      path: '/templates/ts-apollo-postgres-backend',
    },
    {
      uri: 'https://github.com/aerogear/graphback',
      branch: 'templates-0.14.0',
      path: '/templates/ts-react-apollo-client',
      mountpath: "client"
    }]
  },
  {
    name: 'apollo-fullstack-react-mongo-ts',
    description: 'Apollo GraphQL Server connecting to MongoDB database and React client using TypeScript',
    repos: [{
      uri: 'https://github.com/aerogear/graphback',
      branch: 'templates-0.14.0',
      path: '/templates/ts-apollo-mongodb-backend',
    },
    {
      uri: 'https://github.com/aerogear/graphback',
      branch: 'templates-0.14.0',
      path: '/templates/ts-react-apollo-client',
      mountpath: "client"
    }]
  },
  {
    name: 'apollo-mongo-server-ts',
    description: 'Apollo GraphQL Server connecting to MongoDB database using TypeScript',
    repos: [{
      uri: 'https://github.com/aerogear/graphback',
      branch: 'templates-0.14.0',
      path: '/templates/ts-apollo-mongodb-backend',
    }]
  },
  {
    name: 'apollo-postgres-server-ts',
    description: 'Apollo GraphQL Server connecting to Postgres database using TypeScript',
    repos: [{
      uri: 'https://github.com/aerogear/graphback',
      branch: 'templates-0.14.0',
      path: '/templates/ts-apollo-postgres-backend',
    }]
  },

]

/**
 * information about repository
 */
interface TemplateRepositoryTarInformation {
  uri: string
  files: string
}

/**
 * Get github repository information of template
 * @param template template information provided
 */
function getTemplateRepositoryTarInformation(
  template: Template,
): TemplateRepositoryTarInformation {
  const meta = github(template.repo.uri)
  const uri = [
    `https://api.github.com/repos`,
    meta.repo,
    'tarball',
    template.repo.branch,
  ].join('/')

  return { uri, files: template.repo.path }
}

/**
 * download tar file from repository
 * @param tarInfo repository info
 */
async function downloadRepository(
  tarInfo: TemplateRepositoryTarInformation,
): Promise<string> {
  const spinner = ora(`Downloading starter from ${chalk.cyan(tarInfo.uri)}`).start()
  const tmpPath = tmp.fileSync({
    postfix: '.tar.gz',
  })

  // tslint:disable-next-line: typedef
  await new Promise((resolve) => {
    request(tarInfo.uri, {
      headers: {
        'User-Agent': 'aerogear/graphback-cli',
      },
    })
      .pipe(createWriteStream(tmpPath.name))
      .on('close', resolve)
  })

  spinner.succeed()

  return tmpPath.name
}

/**
 * extract the downloaded file into the output path
 * @param file downloaded file from repo
 * @param repo repository information
 * @param output output path
 */
async function extractStarterFromRepository(
  file: string,
  repo: TemplateRepositoryTarInformation,
  output: string,
): Promise<void> {
  const spinner = ora(`Extracting content to ${chalk.cyan(output)}`)

  await tar.extract({
    file: file,
    cwd: output,
    filter: (path: string) => RegExp(repo.files).test(path),
    strip: repo.files.split('/').length,
  })

  spinner.succeed()

  return
}

/**
 * download and extract template from repository into project folder
 * @param template template information
 * @param name name of project folder
 */
export async function extractTemplate(template: Template, name: string) {
  const tarInfo = getTemplateRepositoryTarInformation(template)
  const file = await downloadRepository(tarInfo)
  const output = `${process.cwd()}/${name}`
  await extractStarterFromRepository(file, tarInfo, output)
}
