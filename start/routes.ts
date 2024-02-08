/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Lazy loading controllers
const SessionsController = () => import('#controllers/api/v1/users/sessions_controller')
const RegistrationsController = () => import('#controllers/api/v1/users/registrations_controller')

router
  .group(() => {
    // Users
    router
      .group(() => {
        router.group(() => {
          router.post('login', [SessionsController, 'store']).use(middleware.guest())
          router.post('registrations', [RegistrationsController, 'store']).use(middleware.guest())
        })

        router
          .group(() => {
            router.delete('logout', [SessionsController, 'destroy'])
            router.delete('registrations', [RegistrationsController, 'destroy'])
          })
          .use(middleware.auth())
      })
      .prefix('users')
  })
  .prefix('api/v1')
