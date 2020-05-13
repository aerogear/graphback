//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { readFileSync } from 'fs';
import { GraphbackCoreMetadata } from '@graphback/core';
import { buildSchema } from 'graphql';
import { ResolverGeneratorPlugin } from '../src'

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

test('Test plugin engine ts', async () => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ResolverGeneratorPlugin({ format: 'ts', outputPath: './tmp' });
  expect(plugin.generateResolvers(metadata)).toMatchSnapshot();
});


test('Test plugin engine js', async () => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ResolverGeneratorPlugin({ format: 'js', outputPath: './tmp' });
  expect(plugin.generateResolvers(metadata)).toMatchSnapshot();
});