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
  if ((scalarType && scalarType.name === 'String')|| annotations.type === 'string') {
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
  if (annotations.type === 'date' || (scalarType && scalarType.name === 'GraphbackDate')) {
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

  // graphback datetime
  if (scalarType && scalarType.name === 'GraphbackDateTime') {
    return {
      type: "datetime",
      args: [],
    }
  }

  // graphback time
  if (scalarType && scalarType.name === 'GraphbackTime') {
    return {
      type: "time",
      args: [],
    }
  }

  // timestamp
  if (annotations.type === 'timestamp') {
    return {
      type: 'timestamp',
      args: [annotations.useTz, annotations.precision],
    }
  }

  // graphback timestamp
  if (scalarType && scalarType.name === 'GraphbackTimestamp') {
    return {
      type: "timestamp",
      args: [],
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

  // graphback json
  if (scalarType && (scalarType.name === 'GraphbackJSON' || scalarType.name === 'GraphbackJSONObject')) {
    return {
      type: "json",
      args: [],
    }
  }


  // graphback ObjectId
  if (scalarType && scalarType.name === 'GraphbackObjectID') {
    return {
      type: "string",
      args: [24]
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
