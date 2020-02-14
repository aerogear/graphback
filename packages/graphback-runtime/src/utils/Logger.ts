

/**
 * Offers basic logging component providing ability to print some extra messages
 */
export interface GraphbackMessageLogger {
    /**
     * @param message message to log
     * @param level additional context information to log
     */
    //tslint:disable-next-line: no-any
    log(message: string, context?: any): void
}

/**
 * Loggger component that provides audit log information
 */
export const defaultLogger: GraphbackMessageLogger = {
    log: (message: string) => {
        //tslint:disable-next-line: no-console
        console.log(message);
    }
}