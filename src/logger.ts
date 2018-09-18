import * as pino from 'pino'

export const logger = pino({ level: 'info' }, process.stdout)
