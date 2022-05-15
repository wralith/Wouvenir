import express from 'express'
import routes from './routes'
import deserializeUser from './middleware/deserializeUser'


export default function createApp() {
  const app = express()
  app.use(express.json())

  app.use(deserializeUser)

  routes(app)
  return app
}
