import vine from '@vinejs/vine'
import { uniqueRule } from '#validators/rules/unique'

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.create({
  email: vine
    .string()
    .email()
    .use(uniqueRule({ table: 'users', column: 'email' })),
  password: vine.string().minLength(8).confirmed(),
  firstName: vine.string(),
  lastName: vine.string(),
})
