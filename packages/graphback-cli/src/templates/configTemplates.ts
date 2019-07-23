import { readFileSync, writeFileSync } from 'fs';

const configFilesPath = `${__dirname}/resources/config`

/**
 * Different database choices
 */
export const defaultDB = {
  name: 'postgres',
  config: readFileSync(`${configFilesPath}/pgconfig.json`, 'utf8')
}

const dockerFilesPath = `${__dirname}/resources/docker`

const pgDockerCompose = () => {
  return readFileSync(`${dockerFilesPath}/pg-docker-compose.yml`, 'utf8')
}

const generationConfig = `{
  "create": true,
  "update": true,
  "findAll": true,
  "find": true,
  "delete": false,
  "subCreate": false,
  "subUpdate": false,
  "subDelete": false,
}`

/**
 * Create config file with db info
 */
export const createDBConfig = (projectName: string) => {
  const configPath = `${process.cwd()}/config.json`
  const dockerComposePath = `${process.cwd()}/docker-compose.yml`
  const config = `{
  "dbConfig": ${defaultDB.config}
  "generation": ${generationConfig}
}`
  writeFileSync(configPath, config)
  writeFileSync(dockerComposePath, pgDockerCompose())
}