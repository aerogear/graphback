import { mkdirSync, readFileSync, rmdirSync } from 'fs';
import * as util from 'util';
import { join } from 'path'

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

    const cliExec = join(__dirname, '../../packages/graphback-cli/dist/index.js')

    const { stdout } = await exec(`node ${cliExec} generate`);

    const graphqlSchema = readFileSync('./output-cli/schema.graphql')
    const clientDocument = readFileSync('./output-cli/client/graphback.graphql')

    expect(stdout).toBeDefined()
    expect(graphqlSchema).toBeDefined()
    expect(clientDocument).toBeDefined()
  })
})
