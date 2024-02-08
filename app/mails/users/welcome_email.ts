import env from '#start/env'
import User from '#models/user'
import { BaseMail } from '@adonisjs/mail'
import i18nManager from '@adonisjs/i18n/services/main'

export default class WelcomeEmail extends BaseMail {
  constructor(private user: User) {
    super()
  }

  prepare() {
    this.message
      .from(env.get('DEFAULT_FROM_EMAIL'))
      .to(this.user.email)
      .subject(
        i18nManager
          .locale(i18nManager.defaultLocale)
          .formatMessage('emails.users.welcome_email.subject')
      )
      .htmlView('emails/welcome_email', { user: this.user })
  }
}
