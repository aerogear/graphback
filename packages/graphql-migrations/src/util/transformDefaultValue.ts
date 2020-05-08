//eslint-disable-next-line import/no-default-export
export default function(value: any) {
  // eslint-disable-next-line no-null/no-null
  if (value === 'NULL::character varying' || value === null) { return undefined }

  return value
}
