
const generatorDirectives = `directive @create(enable: Boolean) on OBJECT
directive @update(enable: Boolean) on OBJECT
directive @delete(enable: Boolean) on OBJECT
directive @find(enable: Boolean) on OBJECT
directive @findAll(enable: Boolean) on OBJECT
directive @subCreate(enable: Boolean) on OBJECT
directive @subUpdate(enable: Boolean) on OBJECT
directive @subDelete(enable: Boolean) on OBJECT
directive @disableGen(enable: Boolean) on OBJECT
`

/**
 * Append all required directives into model
 * 
 * @param schema input schema
 */
export const applyGeneratorDirectives = (schema: string) => {
  return `${generatorDirectives}\n\n
          ${schema}`
}
