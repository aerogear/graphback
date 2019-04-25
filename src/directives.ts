const directives = `
  directive @OneToOne(field: String) on FIELD
  directive @OneToMany(field: String!) on FIELD
  directive @ManyToMany(tablename: String!) on FIELD
`

export default (schema) => {
  return directives + `\n\n` + schema;
}