import { logInfo } from '../utils';
import { prompt as ask } from 'inquirer';

import * as yargs from 'yargs'; // eslint-disable-line no-unused-vars

async function askName(): Promise<string> {
  logInfo(':wave:  Hello stranger!');
  const { name } = await ask([
    {
      type: 'input',
      name: 'name',
      message: "What's your name?"
    }
  ]);
  return name;
}

export type Params = { name?: string };
export const command = 'hello';
export const desc = `Let's get to know each other`;
export const builder: { [key: string]: yargs.Options } = {
  name: { type: 'string', required: false, description: 'your name' }
};
export async function handler({ name }: Params) {
  logInfo(`Oh, nice to meet you, ${name || (await askName())}!`);
}
