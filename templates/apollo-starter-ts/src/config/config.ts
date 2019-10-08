import knex from 'knex'
import * as config from '../../graphback.json'

/**
 * config class
 */
class Config {
  public runtime: boolean
  public port: any
  public db: knex.MySqlConnectionConfig | knex.Sqlite3ConnectionConfig
  constructor() {
    this.port = process.env.PORT || 4000
    this.db = config.db.dbConfig
    this.runtime = true;
  }
}

export default new Config()
