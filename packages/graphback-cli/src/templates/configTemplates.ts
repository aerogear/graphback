// tslint:disable: no-string-literal
import { readFileSync, writeFileSync } from 'fs';
import { prompt as ask } from 'inquirer'
import { getDefaultFoldersLocations } from '../config/ConfigBuilder';

const configFilesPath = `${__dirname}/resources/config`

const dockerFilesPath = `${__dirname}/resources/docker`

/**
 * Different database choices
 */

const getConfig = (database: string) => {
  if(database === 'pg') {
    return [readFileSync(`${configFilesPath}/postgres.json`, 'utf8'), readFileSync(`${dockerFilesPath}/postgres.yml`, 'utf8')]
  } else if(database === 'sqlite3') {
    return [readFileSync(`${configFilesPath}/sqlite3.json`, 'utf8'), undefined]
  } else {
    return undefined
  }
}

const databases = [
  'PostgreSQL',
  'sqlite3'
]

const generationConfig = {
  "create": true,
  "update": true,
  "findAll": true,
  "find": true,
  "delete": false,
  "subCreate": false,
  "subUpdate": false,
  "subDelete": false,
  "disableGen": false
}

export const chooseDatabase = async(): Promise<string> => {
  const { database } = await ask({
    type: 'list',
    name: 'database',
    message: 'Choose your database',
    choices: databases,
    filter: (input: string) => {
      if(input === 'PostgreSQL') {
        return 'pg'
      } else {
        return input
      }
    }
  })

  return database
}

export const askForClient = async(): Promise<boolean> => {
  const { client } = await ask({
    type: 'confirm',
    name: 'client',
    message: 'Do you want to generate client-side queries?'
  })

  return client
}

/**
 * Create config file with db info
 */
export const createConfig = async(database: string, client: boolean) => {
  const configPath = `${process.cwd()}/graphback.json`

  const dockerComposePath = `${process.cwd()}/docker-compose.yml`
  const config = {}
  const [dbConfig, dockerCompose] = getConfig(database)
  config["dbConfig"] = JSON.parse(dbConfig)
  config["generation"] = generationConfig
  config["database"] = database
  config["folders"] = getDefaultFoldersLocations();
  config["client"] = client
  if(dockerCompose) {
    writeFileSync(dockerComposePath, dockerCompose)
  }
 
  writeFileSync(configPath, JSON.stringify(config, undefined, 2))
}