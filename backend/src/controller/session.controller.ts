import { Request, Response } from 'express'
import config from 'config'
import { createSession, findSessions, updateSession } from '../service/session.service'
import { validatePassword } from '../service/user.service'
import { signJwt } from '../utils/jwt.utils'

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body)

  // User will be passed false if invalid
  if (!user) {
    return res.status(401).send('Invalid email or password')
  }

  // Session
  const session = await createSession(user._id, req.get('user-agent') || '')

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') }
  )

  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('refreshTokenTtl') }
  )

  res.cookie('accessToken', accessToken, {
    maxAge: 900000, // 15m
    httpOnly: true,
    domain: 'localhost', // Should change in production
    path: '/',
    sameSite: 'strict',
    secure: false // Should change in production
  })

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10, // 15m
    httpOnly: true,
    domain: 'localhost', // Should change in production
    path: '/',
    sameSite: 'strict',
    secure: false // Should change in production
  })

  return res.send({ accessToken, refreshToken })
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id

  const sessions = await findSessions({ user: userId, valid: true })

  return res.send(sessions)
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session

  await updateSession({_id: sessionId}, {valid: false})

  return res.send({
    accessToken: null,
    refreshToken: null
  })
}
