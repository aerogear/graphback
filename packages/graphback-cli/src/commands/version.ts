import yargs from 'yargs';
import { init } from '../helpers/init'
import { logInfo } from '../utils'

export const command = 'version'
export const desc = 'Print version'

// tslint:disable-next-line: typedef
// tslint:disable-next-line: no-empty
export const builder = (args: yargs.Argv) => {
}

export async function handler() {
  // tslint:disable-next-line: no-require-imports
  const version = require("../../package.json").version
  logInfo(`Graphback version ${version}`);
}
