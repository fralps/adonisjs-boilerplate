import { DefaultAuthProvider, DefaultAuthenticatePayload } from 'adminjs'
import env from '#start/env'

import componentLoader from './component_loader.js'

/**
 * Your "authenticate" function. Depending on the auth provider used, the payload may be different.
 *
 * The default authentication provider uses email and password to authenticate. You can modify this
 * function to use email & password to verify if the User exists and if their passwords match.
 *
 */
const authenticate = async ({ email, password }: DefaultAuthenticatePayload) => {
  if (email === env.get('ADMIN_EMAIL') && password === env.get('ADMIN_PASSWORD')) {
    return Promise.resolve({ email })
  }

  return null
}

const authProvider = new DefaultAuthProvider({
  componentLoader,
  authenticate,
})

export default authProvider