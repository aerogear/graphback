import ava, { ExecutionContext } from 'ava';
import { hasListType } from '../src/utils/hasListType';
import { GraphQLNonNull, GraphQLList, GraphQLFloat } from 'graphql';

ava('should return false for plain output type', (t: ExecutionContext) => {
    const outputType = GraphQLFloat;
    const hasList = hasListType(outputType);
    t.assert(!hasList);
});

ava('should return false for wrapped output type', (t: ExecutionContext) => {
    const outputType = GraphQLNonNull(GraphQLFloat);
    const hasList = hasListType(outputType);
    t.assert(!hasList);
});

ava('should return true for list output type', (t: ExecutionContext) => {
    const outputType = GraphQLList(GraphQLFloat);
    const hasList = hasListType(outputType);
    t.assert(hasList);
});

ava('should return true for wrapped list', (t: ExecutionContext) => {
    const outputType = GraphQLNonNull(GraphQLList(GraphQLFloat));
    const hasList = hasListType(outputType);
    t.assert(hasList);
});