import express from 'express'
import routes from './routes'
import deserializeUser from './middleware/deserializeUser'
import cors from 'cors'
import config from 'config'
import cookieParser from 'cookie-parser'

export default function createApp() {
  const app = express()
  app.use(express.json())

  app.use(
    cors({
      origin: config.get('origin'),
      credentials: true
    })
  )

  app.use(cookieParser())

  app.use(deserializeUser)

  routes(app)
  return app
}
