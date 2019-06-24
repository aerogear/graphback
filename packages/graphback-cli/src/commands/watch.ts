import { watch } from '../helpers/watch';

export const command = 'watch'

export const desc = 'Watch for changes in GraphQL model'

export const builder = {}

export async function handler() {
  await watch()
}