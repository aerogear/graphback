import gql from 'graphql-tag';
import {schemaString} from './generated';

export const typeDefs = gql`${schemaString}`;
