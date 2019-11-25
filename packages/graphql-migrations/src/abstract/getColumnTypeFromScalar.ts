import { GraphQLField, GraphQLScalarType } from 'graphql'
import { TableColumnType } from './TableColumn'
import { parseAnnotations } from 'graphql-annotations'

export interface TableColumnTypeDescriptor {
  /**
   * Knex column builder function name.
   */
  type: TableColumnType | string
  /**
   * Builder function arguments.
   */
  args: any[]
}

export default function (
  field: GraphQLField<any, any>,
  scalarType: GraphQLScalarType | null = null,
  annotations: any = null,
): TableColumnTypeDescriptor | null {
  if (!annotations) {
    annotations = parseAnnotations('db', field.description || null)
  }

  // text
  if (annotations.type === 'text') {
    return {
      type: 'text',
      args: [],
    }
  }

  // string
  if ((scalarType && scalarType.name === 'String') || annotations.type === 'string') {
    return {
      type: 'string',
      args: [annotations.length || 255],
    }
  }

  // integer
  if ((scalarType && scalarType.name === 'Int') || annotations.type === 'integer') {
    return {
      type: 'integer',
      args: [],
    }
  }

  // float
  if ((scalarType && scalarType.name === 'Float') || annotations.type === 'float') {
    return {
      type: 'float',
      args: [annotations.precision, annotations.scale],
    }
  }

  // boolean
  if ((scalarType && scalarType.name === 'Boolean') || annotations.type === 'boolean') {
    return {
      type: 'boolean',
      args: [],
    }
  }

  // date
  if (annotations.type === 'date') {
    return {
      type: 'date',
      args: [],
    }
  }

  // datetime & time
  if (['datetime', 'time'].includes(annotations.type)) {
    return {
      type: annotations.type,
      args: [annotations.precision],
    }
  }

  // timestamp
  if (annotations.type === 'timestamp') {
    return {
      type: 'timestamp',
      args: [annotations.useTz, annotations.precision],
    }
  }

  // binary
  if (annotations.type === 'binary') {
    return {
      type: 'binary',
      args: [annotations.length],
    }
  }

  // json & jsonb
  if (['json', 'jsonb'].includes(annotations.type)) {
    return {
      type: annotations.type,
      args: [],
    }
  }

  // uuid
  if ((scalarType && scalarType.name === 'ID') || annotations.type === 'uuid') {
    return {
      type: 'uuid',
      args: [],
    }
  }

  // unknown type
  if (annotations.type) {
    return {
      type: annotations.type,
      args: annotations.args || [],
    }
  }

  return null
}
