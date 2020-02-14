/*eslint-disable max-lines*/
import test, { ExecutionContext } from 'ava';
import { computeDiff } from '../../src'
import { AbstractDatabase } from '../../src/abstract/AbstractDatabase'
import { Table } from '../../src/abstract/Table'
import { TableColumn } from '../../src/abstract/TableColumn'
import { Operation } from '../../src/diff/Operation';

function dbFactory(tables: Table[] = []): AbstractDatabase {
  return {
    tables,
    tableMap: new Map(),
  }
}

function tableFactory(options: any): Table {
  return {
    columns: [],
    primaries: [],
    indexes: [],
    uniques: [],
    annotations: {},
    columnMap: new Map(),
    ...options,
  }
}

function columnFactory(options: any): TableColumn {
  return {
    args: [],
    nullable: true,
    annotations: {},
    defaultValue: undefined,
    comment: undefined,
    foreign: undefined,
    ...options,
  }
}

test('create simple table', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory(), dbFactory([
    tableFactory({
      name: 'User',
      comment: 'Some comment',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
          nullable: false,
        }),
        columnFactory({
          name: 'name',
          type: 'string',
          args: [150],
        }),
      ]
    }),
  ]))
  t.assert(result.length === 4)

  t.deepEqual(result[0], {
    type: 'table.create',
    table: 'User',
    priority: 0,
  } as Operation)
  t.deepEqual(result[1], {
    type: 'table.comment.set',
    table: 'User',
    comment: 'Some comment',
    priority: 0,
  } as Operation)
  t.deepEqual(result[2], {
    type: 'table.primary.set',
    table: 'User',
    column: 'id',
    columnType: 'increments',
    priority: 0,
  } as Operation)
  t.deepEqual(result[3], {
    type: 'column.create',
    table: 'User',
    column: 'name',
    columnType: 'string',
    args: [150],
    nullable: true,
    defaultValue: undefined,
    comment: undefined,
    priority: 0,
  } as Operation)

  t.snapshot(result);
})

test('rename table', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
    }),
  ]), dbFactory([
    tableFactory({
      name: 'users',
      annotations: {
        oldNames: ['User'],
      },
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'table.rename',
    fromName: 'User',
    toName: 'users',
    priority: 0,
  } as Operation)
})

test('update table comment', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      comment: 'Some comment',
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      comment: 'New comment',
    }),
  ]), {
    updateComments: true,
  })
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'table.comment.set',
    table: 'User',
    comment: 'New comment',
    priority: 0,
  } as Operation)
})

test('set primary key', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User'
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        }),
      ],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'table.primary.set',
    table: 'User',
    column: 'id',
    columnType: 'increments',
    priority: 0,
  } as Operation)
})

test('add column', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        })
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        }),
        columnFactory({
          name: 'name',
          type: 'string',
        }),
      ],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'column.create',
    table: 'User',
    column: 'name',
    columnType: 'string',
    args: [],
    nullable: true,
    defaultValue: undefined,
    comment: undefined,
    priority: 0,
  } as Operation)
})

test('add and remove column', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        }),
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'email',
          type: 'string',
        }),
      ],
    }),
  ]))
  t.assert(result.length === 2)
  t.deepEqual(result[0], {
    type: 'column.drop',
    table: 'User',
    column: 'id',
    priority: 0,
  } as Operation)
  t.deepEqual(result[1], {
    type: 'column.create',
    table: 'User',
    column: 'email',
    columnType: 'string',
    args: [],
    nullable: true,
    defaultValue: undefined,
    comment: undefined,
    priority: 0,
  } as Operation)
})

test('rename column', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        }),
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'email',
          type: 'increments',
          annotations: {
            oldNames: ['id'],
          },
        }),
      ],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'column.rename',
    table: 'User',
    fromName: 'id',
    toName: 'email',
    priority: 0,
  } as Operation)
})

test('change column comment', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'name',
          type: 'string',
          comment: 'foo',
        }),
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'name',
          type: 'string',
          comment: 'bar',
        }),
      ],
    }),
  ]), {
    updateComments: true,
  })
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'column.alter',
    table: 'User',
    column: 'name',
    columnType: 'string',
    args: [],
    nullable: true,
    defaultValue: undefined,
    comment: 'bar',
    priority: 0,
  } as Operation)
})

test('change column type', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'age',
          type: 'integer',
        }),
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'age',
          type: 'bigInteger',
        }),
      ],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'column.alter',
    table: 'User',
    column: 'age',
    columnType: 'bigInteger',
    args: [],
    nullable: true,
    defaultValue: undefined,
    comment: undefined,
    priority: 0,
  } as Operation)
})

test('change column type args', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'name',
          type: 'string',
          args: [100],
        }),
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'name',
          type: 'string',
          args: [200],
        }),
      ],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'column.alter',
    table: 'User',
    column: 'name',
    columnType: 'string',
    args: [200],
    nullable: true,
    defaultValue: undefined,
    comment: undefined,
    priority: 0,
  } as Operation)
})

test('change column nullable', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'name',
          type: 'string',
          nullable: false,
        }),
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'name',
          type: 'string',
          nullable: true,
        }),
      ],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'column.alter',
    table: 'User',
    column: 'name',
    columnType: 'string',
    args: [],
    nullable: true,
    defaultValue: undefined,
    comment: undefined,
    priority: 0,
  } as Operation)
})

test('change column default value', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'name',
          type: 'string',
          defaultValue: 'foo',
        }),
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'name',
          type: 'string',
          defaultValue: 'bar',
        }),
      ],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'column.alter',
    table: 'User',
    column: 'name',
    columnType: 'string',
    args: [],
    nullable: true,
    defaultValue: 'bar',
    comment: undefined,
    priority: 0,
  } as Operation)
})

test('change anonymous index', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        }),
        columnFactory({
          name: 'email',
          type: 'string',
        }),
      ],
      indexes: [{ columns: ['id'] }],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        }),
        columnFactory({
          name: 'email',
          type: 'string',
        }),
      ],
      indexes: [{ columns: ['email'] }],
    }),
  ]))
  t.assert(result.length === 2)
  t.deepEqual(result[0], {
    type: 'table.index.drop',
    table: 'User',
    indexName: undefined,
    columns: ['id'],
    priority: 0,
  } as Operation)
  t.deepEqual(result[1], {
    type: 'table.index.create',
    table: 'User',
    indexName: undefined,
    indexType: undefined,
    columns: ['email'],
    priority: 0,
  } as Operation)
})

test('change named index', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        }),
        columnFactory({
          name: 'email',
          type: 'string',
        }),
      ],
      indexes: [{ columns: ['id'], name: 'foo' }],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        }),
        columnFactory({
          name: 'email',
          type: 'string',
        }),
      ],
      indexes: [{ columns: ['email'], name: 'foo' }],
    }),
  ]))
  t.assert(result.length === 2)
  t.deepEqual(result[0], {
    type: 'table.index.drop',
    table: 'User',
    columns: ['id'],
    indexName: 'foo',
    priority: 0,
  } as Operation)
  t.deepEqual(result[1], {
    type: 'table.index.create',
    table: 'User',
    columns: ['email'],
    indexName: 'foo',
    indexType: undefined,
    priority: 0,
  } as Operation)
})

test('untouched named index', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        }),
        columnFactory({
          name: 'email',
          type: 'string',
        }),
      ],
      indexes: [{ columns: ['id'] }, { columns: ['id'], name: 'foo' }],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
        }),
        columnFactory({
          name: 'email',
          type: 'string',
        }),
      ],
      indexes: [{ columns: ['id'], name: 'foo' }],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'table.index.drop',
    indexName: undefined,
    table: 'User',
    columns: ['id'],
    priority: 0,
  } as Operation)
})

test('create table & join table', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory(), dbFactory([
    tableFactory({
      name: 'user',
    }),
    tableFactory({
      name: 'user_groups_join_group_users',
    }),
  ]))
  t.assert(result.length === 2)
  t.deepEqual(result[0], {
    type: 'table.create',
    table: 'user',
    priority: 0,
  } as Operation)
  t.deepEqual(result[1], {
    type: 'table.create',
    table: 'user_groups_join_group_users',
    priority: 1,
  } as Operation)
})
