import { test } from '@japa/runner'
import User from '#models/user'
import { UserFactory } from '#database/factories/user_factory'
import { status, json, cookies } from '#tests/functional/shared-examples/http_response'

test.group('#POST /api/v1/users/login', (group): void => {
  let user: User

  group.each.setup(async (): Promise<void> => {
    user = await UserFactory.create()
  })

  test('returns 200 status', async ({ client }): Promise<void> => {
    const response = await client.post('/api/v1/users/login').json({
      email: user.email,
      password: 'password',
    })

    status(response, 200)
  })

  test('returns correct cookie name', async ({ client }): Promise<void> => {
    const response = await client.post('/api/v1/users/login').json({
      email: user.email,
      password: 'password',
    })

    cookies(response)
  })

  test('returns correct Content-Type response', async ({ client }): Promise<void> => {
    const response = await client.post('/api/v1/users/login').json({
      email: user.email,
      password: 'password',
    })

    json(response)
  })

  test('returns correct json response', async ({ client }): Promise<void> => {
    const response = await client.post('/api/v1/users/login').json({
      email: user.email,
      password: 'password',
    })

    response.assertBody({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })
  })
})

test.group('#DELETE /api/v1/users/logout', (): void => {
  test('returns 401 status when use is not logged in', async ({ client }): Promise<void> => {
    const response = await client.delete('/api/v1/users/logout')

    status(response, 401)
  })

  test('returns 200 status when user is logged in', async ({ client }): Promise<void> => {
    const user: User = await UserFactory.create()
    const response = await client.delete('/api/v1/users/logout').withSession({}).loginAs(user)

    status(response, 200)
  })
})
