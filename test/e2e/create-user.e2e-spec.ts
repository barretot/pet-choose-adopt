import request from 'supertest'

import { UserE2EBuilder } from 'test/e2e/builders/user-e2e-builder'

describe('Create account (E2E)', () => {
  test('[POST] /accounts', async () => {
    const { app, prisma } = (await new UserE2EBuilder().success()).build()

    const response = await request(app.getHttpServer()).post('/user').send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'passwordTest123',
    })
    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.user.findUnique({
      where: { email: 'john@doe.com' },
    })
    expect(userOnDatabase).toBeTruthy()
  })
})
