import { GraphbackRuntimeContext } from "./GraphbackRuntimeContext"

/**
 * Validates if provided context object is valid and throws error otherwise
 * Function can be used as convinience method in resolver layer
 * 
 * @param context 
 */
export const validateRuntimeContext = (context: GraphbackRuntimeContext) => {
    if (!context.crudService) {
      throw new Error("Runtime framework not initialized. Please make sure that 'context.crudService' is exposed to your resolver layer.")
    }

    if (!context.crudDb) {
        throw new Error("Runtime framework not initialized. Please make sure that 'context.crudDb' is exposed to your resolver layer.")
      }
  }
  