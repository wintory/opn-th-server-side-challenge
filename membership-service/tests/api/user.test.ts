import express from 'express'
import request from 'supertest'
import { MOCK_TOKEN } from '../../src/constants/token'
import { userModel } from '../../src/features/user/model'
import UserRoute from '../../src/features/user/route'

const app = express()
app.use(express.json())
app.use('/api/user', UserRoute)

describe('User API', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('GET /api/user', () => {
    it('should get all users', async () => {
      const response = await request(app)
        .get('/api/user')
        .set('Authorization', MOCK_TOKEN)

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.data.length).toBe(1)
    })

    it('should return Unauthorize when token is invalid', async () => {
      const response = await request(app)
        .get('/api/user')
        .set('Authorization', 'aaa')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Unauthorized')
    })

    it('should return Unauthorize when token is undefined', async () => {
      const response = await request(app).get('/api/user')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Unauthorized')
    })
  })

  describe('GET /api/user/:id', () => {
    it('should get user by id', async () => {
      const response = await request(app)
        .get('/api/user/1')
        .set('Authorization', MOCK_TOKEN)

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual({
        address: 'Address1, Bangkok, Thailand',
        age: 26,
        email: 'email@mail.com',
        gender: 'male',
        id: 1,
        isSubscribeNewsletter: true,
        name: 'Name1',
      })
    })

    it('should return 404 when user is not exists', async () => {
      const response = await request(app)
        .get('/api/user/2000')
        .set('Authorization', MOCK_TOKEN)

      expect(response.status).toBe(404)
      expect(response.body.status).toBe('error')
      expect(response.body.message).toEqual('User not found')
    })

    it('should return Unauthorize when token is invalid', async () => {
      const response = await request(app)
        .get('/api/user/1')
        .set('Authorization', 'aaa')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Unauthorized')
    })

    it('should return Unauthorize when token is undefined', async () => {
      const response = await request(app).get('/api/user/1')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Unauthorized')
    })
  })

  describe('PUT /api/user/:id', () => {
    it('should update user by id', async () => {
      const response = await request(app)
        .put('/api/user/1')
        .set('Authorization', MOCK_TOKEN)
        .send({
          dateOfBirth: '1988-04-26T10:27:59.915Z',
          gender: 'female',
          address: 'Address1, BKK, THA',
          isSubscribeNewsletter: true,
        })

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.data).toEqual({
        address: 'Address1, BKK, THA',
        dateOfBirth: '1988-04-26T10:27:59.915Z',
        email: 'email@mail.com',
        gender: 'female',
        id: 1,
        isSubscribeNewsletter: true,
        name: 'Name1',
      })
    })

    it('should fail if field is invalid', async () => {
      const response = await request(app)
        .put('/api/user/1')
        .set('Authorization', MOCK_TOKEN)
        .send({
          gender: 'female',
          address: 'Address1, BKK, THA',
          isSubscribeNewsletter: true,
        })

      expect(response.status).toBe(400)
      expect(response.body.status).toBe('error')
      expect(response.body.messages).toEqual(['dateOfBirth is required'])
    })

    it('should return 404 when user is not exists', async () => {
      const response = await request(app)
        .put('/api/user/2000')
        .set('Authorization', MOCK_TOKEN)

      expect(response.status).toBe(404)
      expect(response.body.status).toBe('error')
      expect(response.body.message).toEqual('User not found')
    })

    it('should return Unauthorize when token is invalid', async () => {
      const response = await request(app)
        .put('/api/user/1')
        .set('Authorization', 'aaa')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Unauthorized')
    })

    it('should return Unauthorize when token is undefined', async () => {
      const response = await request(app).put('/api/user/1')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Unauthorized')
    })
  })

  describe('DELETE /api/user/:id', () => {
    it('should delete user by id', async () => {
      const response = await request(app)
        .delete('/api/user/1')
        .set('Authorization', MOCK_TOKEN)

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.message).toEqual('User deleted successfully')
    })

    it('should return 404 when user is not exists', async () => {
      const response = await request(app)
        .delete('/api/user/200')
        .set('Authorization', MOCK_TOKEN)

      expect(response.status).toBe(404)
      expect(response.body.status).toBe('error')
      expect(response.body.message).toEqual('User not found')
    })

    it('should return Unauthorize when token is invalid', async () => {
      const response = await request(app)
        .delete('/api/user/1')
        .set('Authorization', 'aaa')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Unauthorized')
    })

    it('should return Unauthorize when token is undefined', async () => {
      const response = await request(app).delete('/api/user/1')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Unauthorized')
    })
  })

  describe('PUT /api/user/:id/password', () => {
    beforeEach(() => {
      userModel.create({
        id: 1,
        email: 'email@mail.com',
        password:
          '$2b$10$fIT/TjSKXs05MXIJv9thGueTZnXFLAM8fPRmfmk/HPubYXnw22GGC',
        name: 'Name1',
        dateOfBirth: '1997-04-26T10:27:59.915Z',
        gender: 'male',
        address: 'Address1, Bangkok, Thailand',
        isSubscribeNewsletter: true,
      })
    })

    it('should change user password by id', async () => {
      const response = await request(app)
        .put('/api/user/1/password')
        .set('Authorization', MOCK_TOKEN)
        .send({
          currentPassword: 'securePassword123',
          newPassword: 'securePassword456',
        })

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.message).toEqual('Password updated successfully')
    })

    it('should return error when current password is incorrect', async () => {
      const response = await request(app)
        .put('/api/user/1/password')
        .set('Authorization', MOCK_TOKEN)
        .send({
          currentPassword: '9999',
          newPassword: 'securePassword456',
        })

      expect(response.status).toBe(400)
      expect(response.body.status).toBe('error')
    })

    it('should return 404 when user is not exists', async () => {
      const response = await request(app)
        .put('/api/user/200/password')
        .set('Authorization', MOCK_TOKEN)
        .send({
          currentPassword: 'securePassword123',
          newPassword: 'securePassword456',
        })

      expect(response.status).toBe(404)
      expect(response.body.status).toBe('error')
      expect(response.body.message).toEqual('User not found')
    })

    it('should return Unauthorize when token is invalid', async () => {
      const response = await request(app)
        .put('/api/user/1/password')
        .set('Authorization', 'aaa')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Unauthorized')
    })

    it('should return Unauthorize when token is undefined', async () => {
      const response = await request(app).put('/api/user/1/password')

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Unauthorized')
    })
  })

  describe('POST /api/user/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app).post('/api/user/register').send({
        email: 'email@mail.com',
        password: 'P@ssword1',
        name: 'Name1',
        dateOfBirth: '1988-04-26T10:27:59.915Z',
        gender: 'male',
        address: 'Address1',
        isSubscribeNewsletter: true,
      })

      expect(response.status).toBe(201)
      expect(response.body.status).toBe('success')
      expect(response.body.data.email).toBe('email@mail.com')
    })

    it('should fail if email and name is missing', async () => {
      const response = await request(app).post('/api/user/register').send({
        password: 'password123',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: '123 Test Street',
        isSubscribeNewsletter: true,
      })

      expect(response.status).toBe(400)
      expect(response.body.status).toBe('error')
      expect(response.body.messages).toEqual([
        'email is required',
        'name is required',
      ])
    })
  })
})
