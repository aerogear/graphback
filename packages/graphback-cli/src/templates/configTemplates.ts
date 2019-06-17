import { writeFileSync } from 'fs';
import { prompt as ask } from 'inquirer'
import { Config } from '../templates/templateMetadata'

/**
 * Different database choices
 */
export const dbChoices: Config[] = [
  {
    name: 'postgres',
    config: (projectName: string) => {
      return {
        'user': 'postgresql',
        'password': 'postgres',
        'database': `${projectName}`,
        'host': '127.0.0.1',
        'port': '5432'
      }
    }
  }
]


/**
 * Choose from the available db choices
 */
export async function chooseDB(projectName: string): Promise<object> {
  const { dbName } = await ask([
    {
      type: 'list',
      name: 'dbName',
      message: 'Choose a db of your choice',
      choices: dbChoices.map((d: Config) => d.name)
    }
  ])

  return dbChoices.find((d:Config) => d.name === dbName).config(projectName)
}

/**
 * Create config file with db info
 */
export async function createDBConfig(dbConfig: object) {
  const path = `${process.cwd()}/config.json`
  const config = {
    dbConfig: dbConfig
  }
  writeFileSync(path, JSON.stringify(config))
}