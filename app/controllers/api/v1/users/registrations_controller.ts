import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import WelcomeEmail from '#mails/users/welcome_email'
import FarewellEmail from '#mails/users/farewell_email'
import { createUserValidator } from '#validators/user_validator'
import User from '#models/user'

export default class RegistrationsController {
  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)

    const user: User = await User.create(payload)

    if (user) {
      await mail.sendLater(new WelcomeEmail(user))
    }
  }

  async destroy({ auth }: HttpContext) {
    const user = await User.findOrFail(auth.user!.id)

    if (user) {
      await user.delete()
      await mail.sendLater(new FarewellEmail(user))
    }
  }
}
