import { hasListType } from '../src/utils/hasListType';
import { GraphQLNonNull, GraphQLList, GraphQLFloat } from 'graphql';

test('should return false for plain output type', () => {
    const outputType = GraphQLFloat;
    const hasList = hasListType(outputType);
    t.assert(!hasList);
});

test('should return false for wrapped output type', () => {
    const outputType = GraphQLNonNull(GraphQLFloat);
    const hasList = hasListType(outputType);
    t.assert(!hasList);
});

test('should return true for list output type', () => {
    const outputType = GraphQLList(GraphQLFloat);
    const hasList = hasListType(outputType);
    t.assert(hasList);
});

test('should return true for wrapped list', () => {
    const outputType = GraphQLNonNull(GraphQLList(GraphQLFloat));
    const hasList = hasListType(outputType);
    t.assert(hasList);
});