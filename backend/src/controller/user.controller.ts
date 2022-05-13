import { Request, Response } from 'express'
import { omit } from 'lodash'
import { CreateUserInput } from '../schema/user.schema'
import { createUser } from '../service/user.service'
import logger from '../utils/logger'

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
  try {
    const user = await createUser(req.body)
    // Omits password from response
    return res.send(omit(user.toJSON(), 'password'))
  } catch (e: any) {
    logger.error(e)
    return res.status(409).send(e.message) // 409 => Conflict - Not unique username, Already Registered
  }
}