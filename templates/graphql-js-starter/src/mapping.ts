export * from './schema/generated'
export * from './resolvers'
import { resolvers } from './resolvers'
export * from './schema/generated'

const root = {}

const newResolvers: Array<{[index: string]: any}> = resolvers

newResolvers.forEach((part) => Object.keys(part).forEach((key) => Object.assign(root, part[key])))

export {root}
