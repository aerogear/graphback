import { GraphQLField, GraphQLScalarType } from 'graphql'
import { parseAnnotationsCompat } from '../util/parseAnnotationsCompat';
import { TableColumnType } from './TableColumn'

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

// eslint-disable-next-line complexity
// eslint-disable-next-line
export default function(
  field: GraphQLField<any, any>,
  scalarType: GraphQLScalarType,
  annotations: any,
): TableColumnTypeDescriptor | null {
  if (!annotations) {
    annotations = parseAnnotationsCompat('db', field.description || undefined)
  }

  // increments
  if (scalarType && scalarType.name === 'ID') {
    if (annotations.type) {
      throw new Error(`@db(type: <type>) annotation is not permitted on ID field.`);
    }

    return {
      type: 'increments',
      args: [],
    }
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

  if ((scalarType && scalarType.name === 'JSON' ) || annotations.type === 'json') {
    return {
      type: 'json',
      args: []
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

  // jsonb
  if (annotations.type === 'jsonb') {
    return {
      type: 'jsonb',
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

  return undefined
}
