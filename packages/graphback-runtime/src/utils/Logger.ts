/**
 * Offers basic logging component providing ability to print some extra messages
 */
export interface GraphbackMessageLogger {
  /**
   * @param message message to log
   * @param level additional context information to log
   */
  log(message: string, context?: any): void
}

/**
 * Loggger component that provides audit log information
 */
export const defaultLogger: GraphbackMessageLogger = {
  log: (message: string) => {
    // eslint-disable-next-line no-console
    console.log(message);
  }
}
