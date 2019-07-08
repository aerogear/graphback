const directives = `directive @OnetoMany(field: String) on FIELD_DEFINITION
directive @OneToOne(field: String) on FIELD_DEFINITION
directive @ManyToMany(tablename: String) on FIELD_DEFINITION
directive @Model(paginate: Boolean, 
                  findAll: Boolean, 
                  create: Boolean, 
                  update: Boolean, 
                  find: Boolean,
                  delete: Boolean ) on OBJECT
`

export const applyGeneratorDirectives = (schema: string) => {
  return `${directives}\n\n${schema}`
}