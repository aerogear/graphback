import {
  createKnexCRUDRuntimeContext,
  KnexRuntimeContextConfig
} from "@graphback/runtime"

export const createCRUDResolversRuntimeContext = (
  options: KnexRuntimeContextConfig
) => {
  const { schema, db, pubSub } = options

  const notePubSubContext = {
    pubSub,
    publishCreate: false,
    publishUpdate: false,
    publishDelete: false
  }
  const commentPubSubContext = {
    pubSub,
    publishCreate: false,
    publishUpdate: false,
    publishDelete: false
  }

  return {
    Note: createKnexCRUDRuntimeContext("Note", schema, db, notePubSubContext),

    Comment: createKnexCRUDRuntimeContext(
      "Comment",
      schema,
      db,
      commentPubSubContext
    )
  }
}
