import chalk from 'chalk';
import { createWriteStream } from 'fs'
import ora from 'ora'
import * as github from 'parse-github-url'
import * as request from 'request'
import * as tar from 'tar'
import * as tmp from 'tmp'
import { Template } from './template'

interface TemplateRepositoryTarInformation {
  uri: string
  files: string
}

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

async function downloadRepository(
  tar: TemplateRepositoryTarInformation,
): Promise<string> {
  const spinner = ora(`Downloading starter from ${chalk.cyan(tar.uri)}`).start()
  const tmpPath = tmp.fileSync({
    postfix: '.tar.gz',
  })

  // tslint:disable-next-line: typedef
  await new Promise((resolve) => {
    request(tar.uri, {
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

async function extractStarterFromRepository(
  tmp: string,
  repo: TemplateRepositoryTarInformation,
  output: string,
): Promise<void> {
  const spinner = ora(`Extracting content to ${chalk.cyan(output)}`)

  await tar.extract({
    file: tmp,
    cwd: output,
    filter: (path: string) => RegExp(repo.files).test(path),
    strip: repo.files.split('/').length,
  })

  spinner.succeed()

  return
}

export async function extractTemplate(template: Template, name: string) {
  const tar = getTemplateRepositoryTarInformation(template)
  const tmp = await downloadRepository(tar)
  const output = `${process.cwd()}/${name}`
  await extractStarterFromRepository(tmp, tar, output)
}