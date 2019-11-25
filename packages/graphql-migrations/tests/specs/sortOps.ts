import { sortOps } from '../../src/util/sortOps'
import { Operation } from '../../src/diff/Operation'

describe('sortOps', () => {
  test('sort ops by type priority', () => {
    const ops: Operation[] = [
      { type: 'table.index.drop', priority: 0 },
      { type: 'column.create', priority: 0 },
      { type: 'table.unique.drop', priority: 0 },
      { type: 'table.create', priority: 0 },
      { type: 'table.drop', priority: 0 },
    ]
    ops.sort(sortOps)
    expect(ops).toEqual([
      { type: 'table.unique.drop', priority: 0 },
      { type: 'table.index.drop', priority: 0 },
      { type: 'table.drop', priority: 0 },
      { type: 'table.create', priority: 0 },
      { type: 'column.create', priority: 0 },
    ])
  })

  test('sort ops by priority', () => {
    const ops: Operation[] = [
      { type: 'table.create', priority: 1 },
      { type: 'table.create', priority: 0 },
      { type: 'table.create', priority: 3 },
      { type: 'table.create', priority: 2 },
    ]
    ops.sort(sortOps)
    expect(ops).toEqual([
      { type: 'table.create', priority: 0 },
      { type: 'table.create', priority: 1 },
      { type: 'table.create', priority: 2 },
      { type: 'table.create', priority: 3 },
    ])
  })
})
