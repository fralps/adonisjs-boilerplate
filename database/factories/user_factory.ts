import User from '#models/user'
import Factory from '@adonisjs/lucid/factories'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email().toLocaleLowerCase(),
    password: 'password',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }
}).build()
