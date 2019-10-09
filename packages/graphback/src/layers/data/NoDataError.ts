

/**
 * Error thrown when database query succeded without any data
 * which is not handled by GraphQL specification
 */
export class NoDataError extends Error {
    constructor(message: string) {
        super(`No result from database: ${message}`)
    }
}