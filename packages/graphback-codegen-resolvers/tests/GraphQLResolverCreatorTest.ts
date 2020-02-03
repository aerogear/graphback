// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { GraphbackCoreMetadata } from '@graphback/core';
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { buildSchema } from 'graphql';
import { ResolverGeneratorPlugin } from '../src'

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

ava('Test plugin engine ts', async (t: ExecutionContext) => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ResolverGeneratorPlugin({ format: 'ts', outputPath: './tmp' });
  t.snapshot(plugin.generateResolvers(metadata));
});


ava('Test plugin engine js', async (t: ExecutionContext) => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ResolverGeneratorPlugin({ format: 'js', outputPath: './tmp' });
  t.snapshot(plugin.generateResolvers(metadata));
});