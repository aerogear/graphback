import { writeFileSync } from 'fs';

/**
 * Different database choices
 */
export const defaultDB = {
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

const pgDockerCompose = (projectName: string) => {
  return `version: '3'

services:
  postgres:
    image: postgres:9.6
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgresql
      POSTGRES_DB: ${projectName}

  # Mosca is a simple MQTT Broker
  # In OpenShift/Production we would use the Red Hat AMQ broker
  mosca:
    image: matteocollina/mosca
    ports:
      - "1883:1883" # MQTT
      - "80:80" # web interface`
}

/**
 * Create config file with db info
 */
export const createDBConfig = (projectName: string) => {
  const configPath = `${process.cwd()}/config.json`
  const dockerComposePath = `${process.cwd()}/docker-compose.yml`
  const config = {
    dbConfig: defaultDB.config(projectName)
  }
  writeFileSync(configPath, JSON.stringify(config, undefined, 2))
  writeFileSync(dockerComposePath, pgDockerCompose(projectName))
}