import { test } from '@japa/runner'
import { status } from '#tests/functional/shared-examples/http_response'
import User from '#models/user'
import { UserFactory } from '#database/factories/user_factory'

test.group('#POST /api/v1/users/registrations', (group): void => {
  let payload = {
    email: '',
    password: 'password',
    password_confirmation: 'password',
    firstName: 'Angelica',
    lastName: 'Gutmann',
  }

  group.each.setup(async (): Promise<void> => {
    payload.email = `user${Math.random()}@gmail.com`
  })

  test('returns 200 status', async ({ client }): Promise<void> => {
    const response = await client.post('/api/v1/users/registrations').json(payload)

    status(response, 200)
  })

  test('returns 404 status if user is already logged in', async ({ client }): Promise<void> => {
    const user: User = await UserFactory.create()
    const response = await client
      .post('/api/v1/users/registrations')
      .json(payload)
      .withSession({})
      .loginAs(user)

    status(response, 404)
  })
})

test.group('#DELETE /api/v1/users/registrations', (): void => {
  test('returns 401 status when user is not logged in', async ({ client }): Promise<void> => {
    const response = await client.delete('/api/v1/users/registrations')

    status(response, 401)
  })

  test('returns 200 status when user is logged in', async ({ client }): Promise<void> => {
    const user: User = await UserFactory.create()
    const response = await client
      .delete('/api/v1/users/registrations')
      .withSession({})
      .loginAs(user)

    status(response, 200)
  })
})
