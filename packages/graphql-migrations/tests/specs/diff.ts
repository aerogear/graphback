import ava, { ExecutionContext } from 'ava';
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
    comment: null,
    foreign: null,
    ...options,
  }
}

ava('create simple table', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory(), dbFactory([
    tableFactory({
      name: 'User',
      comment: 'Some comment',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
          nullable: false,
        }),
        columnFactory({
          name: 'name',
          type: 'string',
          args: [150],
        }),
      ],
      primaries: [
        { columns: ['id'], name: undefined },
      ],
    }),
  ]))
  t.assert(result.length === 5)

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
    type: 'column.create',
    table: 'User',
    column: 'id',
    columnType: 'uuid',
    args: [],
    nullable: false,
    defaultValue: undefined,
    comment: null,
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
    comment: null,
    priority: 0,
  } as Operation)
  t.deepEqual(result[4], {
    type: 'table.primary.set',
    table: 'User',
    indexName: undefined,
    columns: ['id'],
    priority: 0,
  } as Operation)
})

ava('rename table', async (t: ExecutionContext) => {
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

ava('update table comment', async (t: ExecutionContext) => {
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

ava('add column', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
        }),
      ],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'column.create',
    table: 'User',
    column: 'id',
    columnType: 'uuid',
    args: [],
    nullable: true,
    defaultValue: undefined,
    comment: null,
    priority: 0,
  } as Operation)
})

ava('add and remove column', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
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
    comment: null,
    priority: 0,
  } as Operation)
})

ava('rename column', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
        }),
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'email',
          type: 'uuid',
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

ava('change column comment', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
          comment: 'foo',
        }),
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
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
    column: 'id',
    columnType: 'uuid',
    args: [],
    nullable: true,
    defaultValue: undefined,
    comment: 'bar',
    priority: 0,
  } as Operation)
})

ava('change column type', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
        }),
      ],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'string',
        }),
      ],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'column.alter',
    table: 'User',
    column: 'id',
    columnType: 'string',
    args: [],
    nullable: true,
    defaultValue: undefined,
    comment: null,
    priority: 0,
  } as Operation)
})

ava('change column type args', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
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
          name: 'id',
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
    column: 'id',
    columnType: 'string',
    args: [200],
    nullable: true,
    defaultValue: undefined,
    comment: null,
    priority: 0,
  } as Operation)
})

ava('change column nullable', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
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
          name: 'id',
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
    column: 'id',
    columnType: 'string',
    args: [],
    nullable: true,
    defaultValue: undefined,
    comment: null,
    priority: 0,
  } as Operation)
})

ava('change column default value', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
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
          name: 'id',
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
    column: 'id',
    columnType: 'string',
    args: [],
    nullable: true,
    defaultValue: 'bar',
    comment: null,
    priority: 0,
  } as Operation)
})

ava('change primary key', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
        }),
        columnFactory({
          name: 'email',
          type: 'string',
        }),
      ],
      primaries: [{ columns: ['id'] }],
    }),
  ]), dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
        }),
        columnFactory({
          name: 'email',
          type: 'string',
        }),
      ],
      primaries: [{ columns: ['email'] }],
    }),
  ]))
  t.assert(result.length === 1)
  t.deepEqual(result[0], {
    type: 'table.primary.set',
    table: 'User',
    indexName: undefined,
    columns: ['email'],
    priority: 0,
  } as Operation)
})

ava('change anonymous index', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
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
          type: 'uuid',
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

ava('change named index', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
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
          type: 'uuid',
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

ava('untouched named index', async (t: ExecutionContext) => {
  const result = await computeDiff(dbFactory([
    tableFactory({
      name: 'User',
      columns: [
        columnFactory({
          name: 'id',
          type: 'uuid',
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
          type: 'uuid',
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

ava('create table & join table', async (t: ExecutionContext) => {
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
