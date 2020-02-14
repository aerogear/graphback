//eslint-disable-next-line import/no-default-export
export default function(value: any) {
  if (value === 'NULL::character varying') { return undefined }

  return value
}
