import { buildSchema } from 'graphql';
import { GraphbackConfig } from '../src/GraphbackConfig';
import { GraphbackRuntime } from '../src/GraphbackRuntime';
import { GraphbackPubSubModel } from '@graphback/runtime';

describe('GraphbackRuntime', () => {
  const schema = `
    """
      @model
      @crud.subCreate: true 
      @crud.subUpdate: false 
      @crud.subDelete: true 
      """
      type FirstModel {
      id: ID!
      }
    
      """
      @model
      @crud.subCreate: false 
      @crud.subUpdate: true 
      """
      type FirstSecond {
      id: ID!
      }

      """
      @model
      @crud.find: false
      @crud.create: false
      @crud.delete: false
      @crud.update: false
      @crud.findOne: false
      """
      type FirstThird {
      id: ID!
      }
    `;

  test('returns an empty list of models when none of the CRUD operation is activated', () => {
    const config: GraphbackConfig = {
      crud: {
        create: false,
        update: false,
        findOne: false,
        find: false,
        delete: false,
        subCreate: false,
        subUpdate: false,
        subDelete: true
      },
      plugins: {
        "graphback-schema": {
          format: 'graphql',
          outputPath: ".",
        }
      }
    }
    const expectedPubSubModels: GraphbackPubSubModel[] = [];

    const graphbackRuntime: GraphbackRuntime = new GraphbackRuntime(buildSchema(schema), config);
    const pubSubModels: GraphbackPubSubModel[] = graphbackRuntime.getDataSourceModels();

    expect(pubSubModels).toEqual(expectedPubSubModels);
  });

  test('returns models (having at least of CRUD operation active) with appropriate subscritpions configuration for each model', () => {
    const config: GraphbackConfig = {
      crud: {
        create: true,
        update: true,
        findOne: true,
        find: true,
        delete: true,
        subCreate: false,
        subUpdate: false,
        subDelete: true
      },
      plugins: {
        "graphback-schema": {
          format: 'graphql',
          outputPath: ".",
        }
      }
    }
    const expectedPubSubModels: GraphbackPubSubModel[] = [
      {
        name: 'FirstModel',
        pubSub: { 
          publishCreate: true, 
          publishUpdate: false, 
          publishDelete: true 
        }
      },
      {
        name: 'FirstSecond',
        pubSub: { 
          publishCreate: false, 
          publishUpdate: true, 
          publishDelete: true 
        }}
      ];

    const graphbackRuntime: GraphbackRuntime = new GraphbackRuntime(buildSchema(schema), config);
    const pubSubModels: GraphbackPubSubModel[] = graphbackRuntime.getDataSourceModels();

    expect(pubSubModels).toEqual(expectedPubSubModels);
  });
});
