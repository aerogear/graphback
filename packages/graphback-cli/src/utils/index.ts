import * as emoji from 'node-emoji';
import * as chalk from 'chalk';

export const log = console.log; // eslint-disable-line no-console
export const logError = (s: string) => log(emoji.emojify(chalk.default.bold.red(s)));
export const logInfo = (s: string) => log(emoji.emojify(chalk.default.bold(s)));
export const logDetail = (s: string) => log(emoji.emojify(chalk.default.dim(s)));
