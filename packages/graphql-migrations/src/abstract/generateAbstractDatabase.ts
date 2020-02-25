/* eslint-disable max-lines */
import { DatabaseNameTransform, defaultTableNameTransform, lowerCaseFirstChar } from '@graphback/core';
import {
  GraphQLField,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLSchema,
  isEnumType,
  isListType,
  isNonNullType,
  isObjectType,
  isScalarType,
  GraphQLEnumValue,
} from 'graphql'
import { parseAnnotations, stripAnnotations } from 'graphql-metadata';
// eslint-disable-next-line import/no-internal-modules
import { TypeMap } from 'graphql/type/schema'
import { escapeComment } from '../util/comments'
import getObjectTypeFromList from '../util/getObjectTypeFromList'
import { AbstractDatabase } from './AbstractDatabase'
import getColumnTypeFromScalar, { TableColumnTypeDescriptor } from './getColumnTypeFromScalar'
import { OneToManyRelationship } from './RelationshipTypes'
import { Table } from './Table'
import { ForeignKey, TableColumn } from './TableColumn'

const ROOT_TYPES = ['Query', 'Mutation', 'Subscription']

const INDEX_TYPES = [
  {
    annotation: 'index',
    list: 'indexes',
    hasType: true,
    defaultName: (table: string, column: string) => `${table}_${column}_index`,
  },
  {
    annotation: 'primary',
    list: 'primaries',
    default: (name: string, type: string) => name === 'id' && type === 'ID',
    max: 1,
    defaultName: (table: string) => `${table}_pkey`,
  },
  {
    annotation: 'unique',
    list: 'uniques',
    defaultName: (table: string, column: string) => `${table}_${column}_unique`,
  },
]

export type ScalarMap = (
  field: GraphQLField<any, any>,
  scalarType: GraphQLScalarType | undefined,
  annotations: any,
) => TableColumnTypeDescriptor | undefined

export interface GenerateAbstractDatabaseOptions {
  scalarMap?: ScalarMap | undefined
  mapListToJson?: boolean
  transformTableName?: DatabaseNameTransform | undefined
}

export const defaultOptions: GenerateAbstractDatabaseOptions = {
  scalarMap: undefined
}

export async function generateAbstractDatabase(
  schema: GraphQLSchema,
  options: GenerateAbstractDatabaseOptions = defaultOptions,
): Promise<AbstractDatabase> {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const builder = new AbstractDatabaseBuilder(schema, options)

  return builder.build()
}

// eslint-disable-next-line @typescript-eslint/tslint/config
class AbstractDatabaseBuilder {
  private schema: GraphQLSchema
  private scalarMap: ScalarMap | undefined
  private mapListToJson: boolean
  private typeMap: TypeMap
  private database: AbstractDatabase
  // Used to push new intermediary tables after current table
  private tableQueue: Table[] = []
  private oneToManyQueue: OneToManyRelationship[] = [];
  private currentTable: Table | undefined = undefined
  private currentType: string | undefined = undefined

  public constructor(schema: GraphQLSchema, options: GenerateAbstractDatabaseOptions) {
    this.schema = schema
    this.scalarMap = options.scalarMap
    this.mapListToJson = options.mapListToJson || defaultOptions.mapListToJson
    this.typeMap = this.schema.getTypeMap()

    this.database = {
      tables: [],
      tableMap: new Map(),
    }
  }

  public build(): AbstractDatabase {
    for (const key of Object.keys(this.typeMap)) {
      const type = this.typeMap[key]
      // Tables
      if (isObjectType(type) && !type.name.startsWith('__') && !ROOT_TYPES.includes(type.name)) {
        this.buildTable(type)
      }
    }

    // create relationships from OneToMany
    for (const oneToMany of this.oneToManyQueue) {
      this.createOneToManyRelationship(oneToMany)
    }

    this.database.tables.push(...this.tableQueue)
    this.fillForeignKeys()

    return this.database
  }

  private getTableName(name: string) {
    return defaultTableNameTransform(name, 'to-db')
  }

  private buildTable(type: GraphQLObjectType) {
    const annotations: any = parseAnnotations('db', type.description || undefined)

    if (annotations.skip) {
      return undefined
    }

    const table: Table = {
      name: annotations.name || this.getTableName(type.name),
      comment: escapeComment(stripAnnotations(type.description || undefined)),
      annotations,
      columns: [],
      columnMap: new Map<string, TableColumn>(),
      indexes: [],
      primaries: [],
      uniques: [],
    }

    this.currentTable = table
    this.currentType = type.name

    const fields = type.getFields()

    if (!fields.id) {
      throw new Error(`Required type ${this.currentType}.id not found`);
    }

    for (const key of Object.keys(fields)) {
      const field = fields[key]

      if (this.isOneToMany(type, field)) {
        this.oneToManyQueue.push({
          kind: 'OneToMany',
          type: getObjectTypeFromList(field),
          relation: type,
          description: field.description
        });
        continue;
      }

      this.buildColumn(table, field)
    }

    this.currentTable = undefined
    this.currentType = undefined

    this.database.tables.push(table)
    this.database.tableMap.set(type.name, table)

    return table
  }

  private buildColumn(table: Table, field: GraphQLField<any, any>) {
    const descriptor = this.getFieldDescriptor(field)
    if (!descriptor) { return undefined }
    table.columns.push(descriptor)
    table.columnMap.set(field.name, descriptor)

    return descriptor
  }

  // eslint-disable-next-line complexity
  private getFieldDescriptor(
    field: GraphQLField<any, any>,
    fieldType?: GraphQLOutputType,
  ): TableColumn | undefined {
    const annotations: any = parseAnnotations('db', field.description || undefined)

    if (annotations.skip) {
      return undefined
    }

    if (!fieldType) {
      fieldType = isNonNullType(field.type) ? field.type.ofType : field.type
    }

    const notNull = isNonNullType(field.type)
    let columnName: string = annotations.name || field.name
    let type: string
    let args: any[]
    let foreign: ForeignKey | undefined

    if (columnName === 'id' && (isScalarType(fieldType) && fieldType.name !== 'ID')) {
      throw new Error(`Scalar ID is missing on type ${this.currentType}.${field.name}`);
    }

    // Scalar
    if (isScalarType(fieldType) || annotations.type) {
      let descriptor
      if (this.scalarMap) {
        descriptor = this.scalarMap(field, isScalarType(fieldType) ? fieldType : undefined, annotations)
      }
      if (!descriptor) {
        descriptor = getColumnTypeFromScalar(field, isScalarType(fieldType) ? fieldType : undefined, annotations)
      }
      if (!descriptor) {
        console.warn(`Unsupported type ${fieldType} on field ${this.currentType}.${field.name}.`)

        return undefined
      }
      type = descriptor.type
      args = descriptor.args

      // Enum
    } else if (isEnumType(fieldType)) {
      type = 'enum'
      args = [fieldType.getValues().map((v: GraphQLEnumValue) => v.name)]

      // Object
    } else if (isObjectType(fieldType)) {
      columnName = annotations.name || `${field.name}Id`
      const foreignType = this.typeMap[fieldType.name]
      if (!foreignType) {
        console.warn(`Foreign type ${fieldType.name} not found on field ${this.currentType}.${field.name}.`)

        return undefined
      }
      if (!isObjectType(foreignType)) {
        console.warn(`Foreign type ${fieldType.name} is not Object type on field ${this.currentType}.${field.name}.`)

        return undefined
      }
      const foreignKey: string = annotations.foreign || 'id'
      const foreignField = foreignType.getFields()[foreignKey]
      if (!foreignField) {
        console.warn(`Foreign field ${foreignKey} on type ${fieldType.name} not found on field ${field.name}.`)

        return undefined
      }
      const descriptor = this.getFieldDescriptor(foreignField)
      if (!descriptor) {
        //tslint:disable-next-line max-line-length
        console.warn(`Couldn't create foreign field ${foreignKey} on type ${fieldType.name} on field ${field.name}. See above messages.`)

        return undefined
      }
      type = descriptor.type
      args = descriptor.args
      foreign = {
        type: foreignType.name,
        field: foreignField.name,
        tableName: undefined,
        columnName: undefined,
      }

      //List
    } else if (isListType(fieldType) && this.currentTable) {
      let ofType = fieldType.ofType
      ofType = isNonNullType(ofType) ? ofType.ofType : ofType
      if (isObjectType(ofType)) {
        //Foreign Type
        const onSameType = this.currentType === ofType.name
        const foreignType = this.typeMap[ofType.name]
        if (!foreignType) {
          console.warn(`Foreign type ${ofType.name} not found on field ${this.currentType}.${field.name}.`)

          return undefined
        }
        if (!isObjectType(foreignType)) {
          console.warn(`Foreign type ${ofType.name} is not Object type on field ${this.currentType}.${field.name}.`)

          return undefined
        }

        //Foreign Field
        const foreignKey = onSameType ? field.name : annotations.manyToMany || this.currentTable.name
        const foreignField = foreignType.getFields()[foreignKey]
        if (!foreignField) { return undefined }
        //@db.foreign
        const foreignAnnotations: any = parseAnnotations('db', foreignField.description || undefined)
        const foreignAnnotation = foreignAnnotations.foreign
        if (foreignAnnotation && foreignAnnotation !== field.name) { return undefined }
        //Type
        const foreignFieldType = isNonNullType(foreignField.type) ? foreignField.type.ofType : foreignField.type
        if (!isListType(foreignFieldType)) { return undefined }

        //Create join table for many-to-many
        const tableName = this.getTableName([
          `${this.currentType}_${field.name}`,
          `${foreignType.name}_${foreignField.name}`,
        ].sort().join('_join_'))
        let joinTable = this.database.tableMap.get(tableName) || undefined
        if (!joinTable) {
          joinTable = {
            name: tableName,
            comment: escapeComment(annotations.tableComment) ||
              //tslint:disable-next-line max-line-length
              `[Auto] Join table between ${this.currentType}.${field.name} and ${foreignType.name}.${foreignField.name}`,
            annotations: {},
            columns: [],
            columnMap: new Map(),
            indexes: [],
            primaries: [],
            uniques: [],
          }
          this.tableQueue.push(joinTable)
          this.database.tableMap.set(tableName, joinTable)
        }
        let descriptors = []
        if (onSameType) {
          const key = annotations.manyToMany || 'id'
          const sameTypeForeignField = foreignType.getFields()[key]
          if (!sameTypeForeignField) {
            console.warn(`Foreign field ${key} on type ${ofType.name} not found on field ${this.currentType}.${field.name}.`)

            return undefined
          }
          const descriptor = this.getFieldDescriptor(sameTypeForeignField, ofType)
          if (!descriptor) { return undefined }
          descriptors = [
            descriptor,
            {
              ...descriptor,
            },
          ]
        } else {
          const descriptor = this.getFieldDescriptor(foreignField, ofType)
          if (!descriptor) { return undefined }
          descriptors = [descriptor]
        }
        for (const descriptor of descriptors) {
          if (joinTable.columnMap.get(descriptor.name)) {
            descriptor.name += '_other'
          }
          joinTable.columns.push(descriptor)
          joinTable.columnMap.set(descriptor.name, descriptor)
        }
        // Index
        joinTable.indexes.push({
          columns: descriptors.map((d: any) => d.name),
          name: `${joinTable.name}_${descriptors.map((d: any) => d.name).join('_')}_index`.substr(0, 63),
          type: undefined,
        })

        return undefined
      } else if (this.mapListToJson) {
        type = 'json'
        args = []
      } else {
        console.warn(`Unsupported Scalar/Enum list on field ${this.currentType}.${field.name}. Use @db.type: "json"`)

        return undefined
      }
      //Unsupported
    } else {
      //tslint:disable-next-line max-line-length
      console.warn(`Field ${this.currentType}.${field.name} of type ${fieldType ? fieldType.toString() : '*unknown*'} not supported. Consider specifying column type with:
      """
      @db.type: "text"
      """
      as the field comment.`)

      return undefined
    }

    //Index
    for (const indexTypeDef of INDEX_TYPES) {
      const annotation = annotations[indexTypeDef.annotation]
      if (this.currentTable && (annotation ||
        (indexTypeDef.default && isScalarType(fieldType) &&
          indexTypeDef.default(field.name, fieldType.name) && annotation !== false))
      ) {
        let indexName: string | undefined
        let indexType: string | undefined
        if (typeof annotation === 'string') {
          indexName = annotation
        } else if (indexTypeDef.hasType && typeof annotation === 'object') {
          indexName = annotation.name
          indexType = annotation.type
        }
        //@ts-ignore
        const list: any[] = this.currentTable[indexTypeDef.list]
        let index = indexName ? list.find((i: any) => i.name === indexName) : undefined
        if (!index) {
          index = indexTypeDef.hasType ? {
            name: indexName,
            type: indexType,
            columns: [],
          } : {
              name: indexName,
              columns: [],
            }
          if (indexTypeDef.max && list.length === indexTypeDef.max) {
            list.splice(0, 1)
          }
          list.push(index)
        }
        index.columns.push(columnName)
        if (!index.name) {
          index.name = indexTypeDef.defaultName(this.currentTable.name, columnName).substr(0, 63)
        }
      }
    }

    return {
      name: columnName,
      comment: escapeComment(stripAnnotations(field.description || undefined)),
      annotations,
      type,
      args: args || [],
      nullable: !notNull,
      foreign,
      // eslint-disable-next-line no-null/no-null
      defaultValue: annotations.default !== null ? annotations.default : null,
    }
  }

  private createOneToManyRelationship(oneToManyRelationship: OneToManyRelationship) {
    const annotations: any = parseAnnotations('db', oneToManyRelationship.description || undefined);

    const field: GraphQLField<any, any> = {
      name: annotations.oneToMany || lowerCaseFirstChar(oneToManyRelationship.relation.name),
      type: oneToManyRelationship.relation,
      description: oneToManyRelationship.description,
      args: [],
      extensions: []
    }

    const table = this.getRelationTableFromOneToMany(oneToManyRelationship)

    if (!this.hasColumn(table, field)) {
      this.buildColumn(table, field);
    }
  }

  private getRelationTableFromOneToMany(oneToMany: OneToManyRelationship) {
    const annotations: any = parseAnnotations('db', oneToMany.description || undefined);

    return this.database.tables.find((table: Table) => {
      const tableName = annotations.name || this.getTableName(oneToMany.type.name);

      return table.name === tableName;
    });
  }

  private isOneToMany(type: GraphQLObjectType, field: GraphQLField<any, any>) {
    const annotations: any = parseAnnotations('db', field.description || undefined);

    const relationType = getObjectTypeFromList(field);
    if ((relationType && relationType.name !== type.name) && !annotations.manyToMany) {
      return true;
    }

    return false;
  }

  private hasColumn(table: Table, field: GraphQLField<any, any>) {
    const columnDescriptor = this.getFieldDescriptor(field);

    const column = table.columns.find((tc: TableColumn) => tc.name === columnDescriptor.name);

    return !!column;
  }

  /**
   * Put the correct values for `foreign.tableName` and `foreign.columnName` in the columns.
   */
  private fillForeignKeys() {
    for (const table of this.database.tables) {
      for (const column of table.columns) {
        if (column.foreign) {
          const foreignTable = this.database.tableMap.get(column.foreign.type || '')
          if (!foreignTable) {
            console.warn(`Foreign key ${table.name}.${column.name}: Table not found for type ${column.foreign.type}.`)
            continue
          }
          const foreignColumn = foreignTable.columnMap.get(column.foreign.field || '')
          if (!foreignColumn) {
            //tslint:disable-next-line max-line-length
            console.warn(`Foreign key ${table.name}.${column.name}: Column not found for field ${column.foreign.field} in table ${foreignTable.name}.`)
            continue
          }
          column.foreign.tableName = foreignTable.name
          column.foreign.columnName = foreignColumn.name
        }
      }
    }
  }
}
