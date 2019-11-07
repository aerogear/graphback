import { InputModelTypeContext } from '@graphback/core';
import { Change } from '@graphql-inspector/core';
import { DatabaseContextProvider } from '../migrations/DatabaseContextProvider';

export interface DatabaseInitializationStrategy {
  init(): Promise<void>;
}
