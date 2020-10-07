/*eslint-disable max-lines*/
import { computeDiff } from '../src';
import { AbstractDatabase } from '../src/abstract/AbstractDatabase'
import { Table } from '../src/abstract/Table'
import { TableColumn } from '../src/abstract/TableColumn'
import { Operation } from '../src/diff/Operation';

function dbFactory(tables: Table[] = []): AbstractDatabase {
  return {
    tables,
    tableMap: new Map(),
  }
}

function tableFactory(options: any): Table {
  return {
    columns: [],
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

test('create simple table', async () => {
  const result = await computeDiff(dbFactory(), dbFactory([
    tableFactory({
      name: 'User',
      comment: 'Some comment',
      columns: [
        columnFactory({
          name: 'id',
          type: 'increments',
          nullable: false,
          isPrimaryKey: true,
          autoIncrementable: true
        }),
        columnFactory({
          name: 'name',
          type: 'string',
          args: [150],
          isPrimaryKey: false,
          autoIncrementable: false
        }),
      ]
    }),
  ]))
  expect(result.length).toEqual(4);

  expect(result[0]).toEqual({
    type: 'table.create',
    table: 'User',
    priority: 0,
  } as Operation)
  expect(result[1]).toEqual({
    type: 'table.comment.set',
    table: 'User',
    comment: 'Some comment',
    priority: 0,
  } as Operation)
  expect(result[2]).toEqual({
    type: "table.primary.set",
    table: 'User',
    column: 'id',
    columnType: "increments",
    priority: 0,
  } as Operation)
  expect(result[3]).toEqual({
    type: 'column.create',
    table: 'User',
    column: 'name',
    columnType: 'string',
    args: [150],
    nullable: true,
    defaultValue: undefined,
    comment: undefined,
    isPrimaryKey: false,
    autoIncrementable: false,
    priority: 0,
  } as Operation)

  expect(result).toMatchSnapshot();
})

test('rename table', async () => {
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
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
    type: 'table.rename',
    fromName: 'User',
    toName: 'users',
    priority: 0,
  } as Operation)
})

test('update table comment', async () => {
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
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
    type: 'table.comment.set',
    table: 'User',
    comment: 'New comment',
    priority: 0,
  } as Operation)
})

test('set primary key', async () => {
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
          nullable: false,
          isPrimaryKey: true,
          autoIncrementable: true
        }),
      ],
    }),
  ]))
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
    type: 'table.primary.set',
    table: 'User',
    column: 'id',
    columnType: 'increments',
    priority: 0,
  } as Operation)
})

test('add column', async () => {
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
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
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

test('add and remove column', async () => {
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
  expect(result.length).toEqual(2);
  expect(result[0]).toEqual({
    type: 'column.drop',
    table: 'User',
    column: 'id',
    priority: 0,
  } as Operation)
  expect(result[1]).toEqual({
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

test('rename column', async () => {
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
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
    type: 'column.rename',
    table: 'User',
    fromName: 'id',
    toName: 'email',
    priority: 0,
  } as Operation)
})

test('change column comment', async () => {
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
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
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

test('change column type', async () => {
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
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
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

test('change column type args', async () => {
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
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
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

test('change column nullable', async () => {
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
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
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

test('change column default value', async () => {
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
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
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

test('change anonymous index', async () => {
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
  expect(result.length).toEqual(2);
  expect(result[0]).toEqual({
    type: 'table.index.drop',
    table: 'User',
    indexName: undefined,
    columns: ['id'],
    priority: 0,
  } as Operation)
  expect(result[1]).toEqual({
    type: 'table.index.create',
    table: 'User',
    indexName: undefined,
    indexType: undefined,
    columns: ['email'],
    priority: 0,
  } as Operation)
})

test('change named index', async () => {
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
  expect(result.length).toEqual(2);
  expect(result[0]).toEqual({
    type: 'table.index.drop',
    table: 'User',
    columns: ['id'],
    indexName: 'foo',
    priority: 0,
  } as Operation)
  expect(result[1]).toEqual({
    type: 'table.index.create',
    table: 'User',
    columns: ['email'],
    indexName: 'foo',
    indexType: undefined,
    priority: 0,
  } as Operation)
})

test('untouched named index', async () => {
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
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual({
    type: 'table.index.drop',
    indexName: undefined,
    table: 'User',
    columns: ['id'],
    priority: 0,
  } as Operation)
})

test('create table & join table', async () => {
  const result = await computeDiff(dbFactory(), dbFactory([
    tableFactory({
      name: 'user',
    }),
    tableFactory({
      name: 'user_groups_join_group_users',
    }),
  ]))
  expect(result.length).toEqual(2);
  expect(result[0]).toEqual({
    type: 'table.create',
    table: 'user',
    priority: 0,
  } as Operation)
  expect(result[1]).toEqual({
    type: 'table.create',
    table: 'user_groups_join_group_users',
    priority: 1,
  } as Operation)
})
