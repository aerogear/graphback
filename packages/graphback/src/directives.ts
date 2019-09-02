const directives = `directive @OneToMany(field: String) on FIELD_DEFINITION
directive @OneToOne(field: String) on FIELD_DEFINITION
directive @create(enable: Boolean) on OBJECT
directive @update(enable: Boolean) on OBJECT
directive @delete(enable: Boolean) on OBJECT
directive @find(enable: Boolean) on OBJECT
directive @findAll(enable: Boolean) on OBJECT
directive @subCreate(enable: Boolean) on OBJECT
directive @subUpdate(enable: Boolean) on OBJECT
directive @subDelete(enable: Boolean) on OBJECT
directive @disableGen(enable: Boolean) on OBJECT
`

export const applyGeneratorDirectives = (schema: string) => {
  return `${directives}\n\n${schema}`
}
