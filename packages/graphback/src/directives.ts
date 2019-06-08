const directives = `
  directive @OneToOne(field: String) on FIELD
  directive @OneToMany(field: String) on FIELD
  directive @ManyToMany(tablename: String) on FIELD
`

export const applyGeneratorDirectives = (schema: string) => {
  return `${directives}\n\n${schema}`
}