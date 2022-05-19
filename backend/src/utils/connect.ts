import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

export default function connect() {
  const dbUri = config.get<string>('dbUri')

  return mongoose
    .connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
      logger.info('DB Connected')
    })
    .catch(err => {
      logger.error('DB Connection Failed')
      process.exit(1)
    })
}
