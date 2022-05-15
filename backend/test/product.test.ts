import request from 'supertest'
import createApp from '../src/app'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { createProduct } from '../src/service/product.service'
import { signJwt } from '../src/utils/jwt.utils'

const app = createApp()

const userId = new mongoose.Types.ObjectId().toString()

const dummyProduct = {
  user: userId,
  title: 'Little Mermaid Figure from 1992',
  description:
    'There is no such figure obviously but for the test purposes will act like there is one an it is from 1992',
  price: 365,
  image: 'https://dummyimage.com/600x400/a67ba6/00054a'
}

const dummyUser = {
  _id: userId,
  email: 'test@example.com',
  name: 'Non Person'
}

describe('product', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()

    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('In get product route', () => {
    it('If product does not exist, should return 404', async () => {
      const productId = 'mystical-holy-artifact'

      await request(app).get(`/api/products/${productId}`).expect(404)
    })

    it('If product exist, should return 200 and product', async () => {
      // @ts-ignore
      const product = await createProduct(dummyProduct)

      const response = await request(app).get(`/api/products/${product.productId}`)

      expect(response.statusCode).toBe(200)

      expect(response.body.productId).toBe(product.productId)
    })
  })
  describe('In post product route', () => {
    it('If user is logged in, create product and return 200', async () => {
      const jwt = signJwt(dummyUser)
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${jwt}`).send(dummyProduct)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        __v: 0,
        _id: expect.any(String),
        createdAt: expect.any(String),
        description:
        'There is no such figure obviously but for the test purposes will act like there is one an it is from 1992',
        image: 'https://dummyimage.com/600x400/a67ba6/00054a',
        price: 365,
        productId: expect.any(String),
        title: 'Little Mermaid Figure from 1992',
        updatedAt: expect.any(String),
        user: expect.any(String),
      })
    })
    it('If user is not logged in, should return 403', async () => {
      await request(app).post('/api/products').expect(403)
    })
  })
})
