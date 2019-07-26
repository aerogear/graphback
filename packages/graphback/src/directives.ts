const directives = `directive @OneToMany(field: String) on FIELD_DEFINITION
directive @OneToOne(field: String) on FIELD_DEFINITION
directive @create on OBJECT
directive @update on OBJECT
directive @delete on OBJECT
directive @find on OBJECT
directive @findAll on OBJECT
directive @subCreate on OBJECT
directive @subUpdate on OBJECT
directive @subDelete on OBJECT
`

export const applyGeneratorDirectives = (schema: string) => {
  return `${directives}\n\n${schema}`
}