import { Express, Request, Response } from 'express'
import { createSessionSchema } from './schema/session.schema'
import { createUserSchema } from './schema/user.schema'
import { createUserHandler } from './controller/user.controller'
import requireUser from './middleware/requireUser'
import validateResource from './middleware/validateResource'
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler
} from './controller/session.controller'

function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200)
  })

  app.post('/api/users', validateResource(createUserSchema), createUserHandler)

  app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler)
  app.get('/api/sessions', requireUser, getUserSessionsHandler)
  app.delete('/api/sessions', requireUser, deleteSessionHandler)
}

export default routes
