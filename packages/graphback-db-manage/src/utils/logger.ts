import * as pino from 'pino'

export let logger = pino({ level: 'warn' }, process.stdout)

/**
 * Override current logger
 *
 * @param newLogger
 */
export const setLogger = (newLogger: pino.Logger) => {
  logger = newLogger;
}

/**
 * Enable debug logging for troubleshooting
 */
export const enableDebug = () => {
  logger = pino({ level: 'debug' }, process.stdout)
}
