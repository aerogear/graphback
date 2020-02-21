import {
  createKnexCRUDRuntimeContext,
  KnexRuntimeContextConfig
} from "@graphback/runtime"

export const createCRUDResolversRuntimeContext = (
  options: KnexRuntimeContextConfig
) => {
  const { schema, db, pubSub } = options

  const todoPubSubContext = {
    pubSub,
    publishCreate: true,
    publishUpdate: true,
    publishDelete: true
  }

  return {
    Todo: createKnexCRUDRuntimeContext("Todo", schema, db, todoPubSubContext)
  }
}
