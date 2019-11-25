import { computeDiff } from '../../src'
import { AbstractDatabase } from '../../src/abstract/AbstractDatabase'
import { Table } from '../../src/abstract/Table'
import { TableColumn } from '../../src/abstract/TableColumn'

function dbFactory (tables: Table[] = []): AbstractDatabase {
  return {
    tables,
    tableMap: new Map(),
  }
}

function tableFactory (options: any): Table {
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

function columnFactory (options: any): TableColumn {
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

describe('compute diff', () => {
  test('create simple table', async () => {
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
    expect(result.length).toBe(5)
    expect(result[0]).toEqual({
      type: 'table.create',
      table: 'User',
      priority: 0,
    })
    expect(result[1]).toEqual({
      type: 'table.comment.set',
      table: 'User',
      comment: 'Some comment',
      priority: 0,
    })
    expect(result[2]).toEqual({
      type: 'column.create',
      table: 'User',
      column: 'id',
      columnType: 'uuid',
      args: [],
      nullable: false,
      defaultValue: undefined,
      comment: null,
      priority: 0,
    })
    expect(result[3]).toEqual({
      type: 'column.create',
      table: 'User',
      column: 'name',
      columnType: 'string',
      args: [150],
      nullable: true,
      defaultValue: undefined,
      comment: null,
      priority: 0,
    })
    expect(result[4]).toEqual({
      type: 'table.primary.set',
      table: 'User',
      columns: ['id'],
      priority: 0,
    })
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'table.rename',
      fromName: 'User',
      toName: 'users',
      priority: 0,
    })
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'table.comment.set',
      table: 'User',
      comment: 'New comment',
      priority: 0,
    })
  })

  test('add column', async () => {
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'column.create',
      table: 'User',
      column: 'id',
      columnType: 'uuid',
      args: [],
      nullable: true,
      defaultValue: undefined,
      comment: null,
      priority: 0,
    })
  })

  test('add and remove column', async () => {
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
    expect(result.length).toBe(2)
    expect(result[0]).toEqual({
      type: 'column.drop',
      table: 'User',
      column: 'id',
      priority: 0,
    })
    expect(result[1]).toEqual({
      type: 'column.create',
      table: 'User',
      column: 'email',
      columnType: 'string',
      args: [],
      nullable: true,
      defaultValue: undefined,
      comment: null,
      priority: 0,
    })
  })

  test('rename column', async () => {
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'column.rename',
      table: 'User',
      fromName: 'id',
      toName: 'email',
      priority: 0,
    })
  })

  test('change column comment', async () => {
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'column.alter',
      table: 'User',
      column: 'id',
      columnType: 'uuid',
      args: [],
      nullable: true,
      defaultValue: undefined,
      comment: 'bar',
      priority: 0,
    })
  })

  test('change column type', async () => {
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'column.alter',
      table: 'User',
      column: 'id',
      columnType: 'string',
      args: [],
      nullable: true,
      defaultValue: undefined,
      comment: null,
      priority: 0,
    })
  })

  test('change column type args', async () => {
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'column.alter',
      table: 'User',
      column: 'id',
      columnType: 'string',
      args: [200],
      nullable: true,
      defaultValue: undefined,
      comment: null,
      priority: 0,
    })
  })

  test('change column nullable', async () => {
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'column.alter',
      table: 'User',
      column: 'id',
      columnType: 'string',
      args: [],
      nullable: true,
      defaultValue: undefined,
      comment: null,
      priority: 0,
    })
  })

  test('change column default value', async () => {
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'column.alter',
      table: 'User',
      column: 'id',
      columnType: 'string',
      args: [],
      nullable: true,
      defaultValue: 'bar',
      comment: null,
      priority: 0,
    })
  })

  test('change primary key', async () => {
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'table.primary.set',
      table: 'User',
      columns: ['email'],
      priority: 0,
    })
  })

  test('change anonymous index', async () => {
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
    expect(result.length).toBe(2)
    expect(result[0]).toEqual({
      type: 'table.index.drop',
      table: 'User',
      columns: ['id'],
      priority: 0,
    })
    expect(result[1]).toEqual({
      type: 'table.index.create',
      table: 'User',
      columns: ['email'],
      priority: 0,
    })
  })

  test('change named index', async () => {
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
    expect(result.length).toBe(2)
    expect(result[0]).toEqual({
      type: 'table.index.drop',
      table: 'User',
      columns: ['id'],
      indexName: 'foo',
      priority: 0,
    })
    expect(result[1]).toEqual({
      type: 'table.index.create',
      table: 'User',
      columns: ['email'],
      indexName: 'foo',
      priority: 0,
    })
  })

  test('untouched named index', async () => {
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
    expect(result.length).toBe(1)
    expect(result[0]).toEqual({
      type: 'table.index.drop',
      table: 'User',
      columns: ['id'],
      priority: 0,
    })
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
    expect(result.length).toBe(2)
    expect(result[0]).toEqual({
      type: 'table.create',
      table: 'user',
      priority: 0,
    })
    expect(result[1]).toEqual({
      type: 'table.create',
      table: 'user_groups_join_group_users',
      priority: 1,
    })
  })
})
