import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SessionsController {
  async store({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return user.serialize({
      fields: {
        pick: ['email', 'firstName', 'lastName', 'id'],
      },
    })
  }

  async destroy({ auth }: HttpContext) {
    await auth.use('web').logout()
  }
}
