import mongoose from 'mongoose'
import * as UserService from '../src/service/user.service'
import * as SessionService from '../src/service/session.service'
import createApp from '../src/app'
import request from 'supertest'
import { createUserSessionHandler } from '../src/controller/session.controller'

const app = createApp()
const userId = new mongoose.Types.ObjectId().toString()

const dummySession = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: 'PostmanRuntime/7.28.4',
  createdAt: new Date('2022-04-30T13:31:07.674Z'),
  updatedAt: new Date('2022-04-30T13:31:07.674Z'),
  __v: 0
}

const dummyUser = {
  _id: userId,
  email: 'testere@mail.com',
  name: 'Tester'
}

const userInput = {
  email: 'test@mail.com',
  name: 'Berk',
  password: 'mostSecuredPassword',
  passwordConfirmation: 'mostSecuredPassword'
}

describe('user', () => {
  // User Register
  describe('User registration', () => {
    it('If username and password valid, should return user payload', async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, 'createUser')
        //@ts-ignore
        .mockReturnValueOnce(dummyUser)

      const response = await request(app).post('/api/users').send(userInput)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(dummyUser)

      expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
    })

    it('If username and password invalid, should return 400', async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, 'createUser')
        //@ts-ignore
        .mockReturnValueOnce(dummyUser)

      const response = await request(app)
        .post('/api/users')
        .send({ ...userInput, passwordConfirmation: 'holdMyBear' })

      expect(response.statusCode).toBe(400)

      expect(createUserServiceMock).not.toHaveBeenCalledWith(userInput)
    })

    it('If throws and error, should return 409', async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, 'createUser')
        .mockRejectedValueOnce('Rejected!')

      const response = await request(app).post('/api/users').send(userInput)

      expect(response.statusCode).toBe(409)

      expect(createUserServiceMock).toHaveBeenCalled()
    })
  })

  // Session

  describe('Create User Session', () => {
    it('If credentials valid, should return accessToken & refreshToken', async () => {
      //@ts-ignore
      jest.spyOn(UserService, 'validatePassword').mockReturnValue(dummyUser)
      //@ts-ignore
      jest.spyOn(SessionService, 'createSession').mockReturnValue(dummySession)

      const request = {
        get: () => {
          return 'user agent'
        },
        body: {
          email: 'test@mail.com',
          password: 'password'
        }
      }
      const send = jest.fn()
      const response = { send }

      //@ts-ignore
      await createUserSessionHandler(request, response)

      expect(send).toHaveBeenCalledWith({
        accessToken: expect.any(String),
        refreshToken: expect.any(String)
      })
    })
  })
})
