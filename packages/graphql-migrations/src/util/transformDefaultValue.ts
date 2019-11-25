export default function (value: any) {
  if (value === 'NULL::character varying') { return null }
  return value
}
