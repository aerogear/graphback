const ALIAS: any = {
  'int': { type: 'integer', args: [] },
  'int4': { type: 'integer', args: [] },
  'smallint': { type: 'integer', args: [] },
  'bigint': { type: 'bigInteger', args: [] },
  'character varying': { type: 'string', args: [] },
  'varchar': { type: 'string', args: [] },
  'double precision': { type: 'float', args: [8] },
  'float8': { type: 'float', args: [8] },
  'real': { type: 'float', args: [4] },
  'float4': { type: 'float', args: [4] },
  'bool': { type: 'boolean', args: [] },
  'time without time zone': { type: 'time', args: [] },
  'time with time zone': { type: 'time', args: [] },
  'timestamp without time zone': { type: 'timestamp', args: [false] },
  'timestamp with time zone': { type: 'timestamp', args: [true] },
  'timestamptz': { type: 'timestamp', args: [true] },
  'bytea': { type: 'binary', args: [] },
}

export default function (dataType: string, maxLength: any): { type: string, args: any[] } {
  let alias = ALIAS[dataType.toLowerCase()]
  if (!alias) {
    alias = { type: dataType, args: [] }
  }
  if (alias.type === 'string' && maxLength) { alias.args = [maxLength] }
  return alias
}
