import { Express, Request, Response } from 'express'
import { createSessionSchema } from './schema/session.schema'
import { createUserSchema } from './schema/user.schema'
import { createUserHandler, getCurrentUser } from './controller/user.controller'
import requireUser from './middleware/requireUser'
import validateResource from './middleware/validateResource'
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler
} from './controller/session.controller'
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema
} from './schema/product.schema'
import {
  createProductHandler,
  updateProductHandler,
  getProductHandler,
  deleteProductHandler
} from './controller/product.controller'

function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200)
  })

  app.post('/api/users', validateResource(createUserSchema), createUserHandler)
  app.get('/api/me', requireUser, getCurrentUser)

  app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler)
  app.get('/api/sessions', requireUser, getUserSessionsHandler)
  app.delete('/api/sessions', requireUser, deleteSessionHandler)

  app.get('/api/products/:productId', validateResource(getProductSchema), getProductHandler)

  app.post(
    '/api/products',
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  )

  app.put(
    '/api/products/:productId',
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  )

  app.delete(
    '/api/products/:productId',
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  )
}

export default routes
