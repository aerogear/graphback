import knex from 'knex'
import * as config from '../../config.json'

/**
 * config class
 */
class Config {
  public port: any
  public db: knex.MySqlConnectionConfig | knex.Sqlite3ConnectionConfig
  constructor() {
    this.port = process.env.PORT || 4000
    this.db = config.dbConfig
  }
}

export default new Config()
