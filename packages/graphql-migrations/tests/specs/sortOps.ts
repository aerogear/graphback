import ava, { ExecutionContext } from 'ava';
import { Operation } from '../../src/diff/Operation'
import { sortOps } from '../../src/util/sortOps'

ava('sort ops by type priority', (t: ExecutionContext) => {
  const ops: Operation[] = [
    { type: 'table.index.drop', priority: 0 },
    { type: 'column.create', priority: 0 },
    { type: 'table.unique.drop', priority: 0 },
    { type: 'table.create', priority: 0 },
    { type: 'table.drop', priority: 0 },
  ]
  ops.sort(sortOps)
  t.deepEqual(ops, [
    { type: 'table.unique.drop', priority: 0 },
    { type: 'table.index.drop', priority: 0 },
    { type: 'table.drop', priority: 0 },
    { type: 'table.create', priority: 0 },
    { type: 'column.create', priority: 0 },
  ])
})

ava('sort ops by priority', (t: ExecutionContext) => {
  const ops: Operation[] = [
    { type: 'table.create', priority: 1 },
    { type: 'table.create', priority: 0 },
    { type: 'table.create', priority: 3 },
    { type: 'table.create', priority: 2 },
  ]
  ops.sort(sortOps)
  t.deepEqual(ops, [
    { type: 'table.create', priority: 0 },
    { type: 'table.create', priority: 1 },
    { type: 'table.create', priority: 2 },
    { type: 'table.create', priority: 3 },
  ])
})
