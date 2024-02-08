import { test } from '@japa/runner'
import env from '#start/env'
import FarewellEmail from '#mails/users/farewell_email'
import i18nManager from '@adonisjs/i18n/services/main'
import User from '#models/user'
import { UserFactory } from '#database/factories/user_factory'

test.group('Welcome email', (group) => {
  let user: User
  let email: FarewellEmail
  let from: string
  let subject: string
  let body: string

  group.each.setup(async (): Promise<void> => {
    user = await UserFactory.create()
    email = new FarewellEmail(user)
    from = env.get('DEFAULT_FROM_EMAIL')
    subject = i18nManager
      .locale(i18nManager.defaultLocale)
      .formatMessage('emails.users.farewell_email.subject')
    body = i18nManager
      .locale(i18nManager.defaultLocale)
      .formatMessage('emails.users.farewell_email.content')

    await email.buildWithContents()
  })

  test('email contains user email', async () => {
    email.message.assertTo(user.email)
  })

  test('email contains from email', async () => {
    email.message.assertFrom(from)
  })

  test('email contains subject', async () => {
    email.message.assertSubject(subject)
  })

  test('email contains body', async () => {
    email.message.assertContent('html', body)
  })
})
