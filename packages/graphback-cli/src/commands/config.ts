
import { initConfig } from '../components/config';

type Params = { name?: string, templateName?: string, templateUrl: string }

export const command = 'config'

export const desc = 'Create Graphback configuration in existing project'


export const builder = {}

export async function handler({ name }: Params) {
  await initConfig();
}