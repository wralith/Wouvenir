import { NextFunction, Request, Response } from 'express'
import { get } from 'lodash'
import { reIssueAccessToken } from '../service/session.service'
import { verifyJwt } from '../utils/jwt.utils'

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  // Remove 'Bearer ' in front of the authorization value
  const accessToken =
    get(req, 'cookies.accessToken') ||
    get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')

  const refreshToken = get(req, 'cookies.refreshToken') || get(req, 'headers.x-refresh')

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

    res.cookie('accessToken', accessToken, {
      maxAge: 900000, // 15m
      httpOnly: true,
      domain: 'localhost', // Should change in production
      path: '/',
      sameSite: 'strict',
      secure: false // Should change in production
    })

    const result = verifyJwt(newAccessToken as string)
    res.locals.user = result.decoded
    return next()
  }

  return next()
}

export default deserializeUser
