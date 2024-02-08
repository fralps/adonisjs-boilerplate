import { test } from '@japa/runner'
import User from '#models/user'

test.group('Model User', (group) => {
  const subject = new User()

  group.each.setup(async () => {
    subject.fill({
      firstName: 'Larry',
      lastName: 'Cover',
      email: 'larry.cover@gmail.com',
      password: 'password123',
    })
    await subject.save()
  })

  test('it returns an instance of User', ({ expect }) => {
    expect(subject).toBeInstanceOf(User)
  })
})
