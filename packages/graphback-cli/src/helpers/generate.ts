
import { logInfo } from '../utils';
import { generateUsingEngine } from '../components/generate';

// TODO remove this stuff
/**
 * Message after command execution
 */
function postCommandMessage(cliName: string): void {
  logInfo(`
Successfully generated schema and resolvers :tada:.
`)
}

/**
 * exported generate handler
 */
export async function generate(cliName: string = "graphback"): Promise<void> {
  // TODO map flags
  await generateUsingEngine({ silent: false, watch: false })
  postCommandMessage(cliName)
}
