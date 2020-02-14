import * as chalk from 'chalk';
import * as emoji from 'node-emoji';

//tslint:disable-next-line: no-console
export const log = console.log; 
export const logError = (s: string) => log(emoji.emojify(chalk.default.bold.red(s)));
export const logInfo = (s: string) => log(emoji.emojify(chalk.default.bold(s)));
export const logDetail = (s: string) => log(emoji.emojify(chalk.default.dim(s)));
