import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

export default function connect() {
  const dbUri = config.get<string>('dbUri')

  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info('DB Connected')
    })
    .catch(err => {
      logger.error('DB Connection Failed')
      process.exit(1)
    })
}
