import { Operation } from '../src/diff/Operation';
import { removeNonSafeOperationsFilter } from '../src/plugin/MigrateOperationFilter';

test('remove table, colum deletion and rename operations', () => {
  const ops: Operation[] = [
    { type: 'table.index.drop', priority: 0 },
    { type: 'column.create', priority: 0 },
    { type: 'column.drop', priority: 0 },
    { type: 'table.rename', priority: 0 },
    { type: 'table.create', priority: 0 },
    { type: 'table.drop', priority: 0 },
    { type: 'column.rename', priority: 0 }
  ];

  const expected = removeNonSafeOperationsFilter.filter(ops);

  expect(expected).toEqual([
    { type: 'table.index.drop', priority: 0 },
    { type: 'column.create', priority: 0 },
    { type: 'table.create', priority: 0 },
  ])
})

