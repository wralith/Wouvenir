import { NextFunction, Request, Response } from 'express'
import { get } from 'lodash'
import { reIssueAccessToken } from '../service/session.service'
import { verifyJwt } from '../utils/jwt.utils'

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  // Remove 'Bearer ' in front of the authorization value
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')

  const refreshToken = get(req, 'headers.x-refresh')

  if (!accessToken) {
    return next() // exit
  }

  const { decoded, expired } = verifyJwt(accessToken)

  if (decoded) {
    res.locals.user = decoded
    return next()
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken }) 

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)
    }
    const result = verifyJwt(newAccessToken as string)
    res.locals.user = result.decoded
    return next()
  }

  return next()
}

export default deserializeUser
