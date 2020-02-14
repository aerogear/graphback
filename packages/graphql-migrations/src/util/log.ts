import chalk from 'chalk';
import * as emoji from 'node-emoji';

// eslint-disable-next-line no-console
export const log = console.log;
export const logError = (s: string) => log(emoji.emojify(chalk.bold.red(s)));
export const logInfo = (s: string) => log(emoji.emojify(chalk.bold(s)));
export const logDetail = (s: string) => log(emoji.emojify(chalk.dim(s)));
