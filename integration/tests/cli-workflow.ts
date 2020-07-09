import { mkdirSync, readFileSync, rmdirSync } from 'fs';
import * as util from 'util';

beforeAll(() => {
  mkdirSync('./output-cli/client', { recursive: true })
})

afterAll(() => {
  rmdirSync('./output-cli', { recursive: true })
})

describe('CLI tests', () => {
  test('generate', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const exec = util.promisify(require('child_process').exec);

    const { stdout } = await exec('yarn graphback generate');

    const graphqlSchema = readFileSync('./output-cli/schema.graphql')
    const clientDocument = readFileSync('./output-cli/client/graphback.graphql')

    expect(stdout).toBeDefined()
    expect(graphqlSchema).toBeDefined()
    expect(clientDocument).toBeDefined()
  })
})
