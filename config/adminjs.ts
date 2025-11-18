import { AdminJSProviderConfig } from '@adminjs/adonis'
import { LucidResource } from '@adminjs/adonis'
import User from '#models/user'
import { dark, light, noSidebar } from '@adminjs/themes'

import componentLoader from '../app/admin/component_loader.js'
import authProvider from '../app/admin/auth.js'

const adminjsConfig: AdminJSProviderConfig = {
  adapter: {
    enabled: true,
  },
  adminjs: {
    rootPath: '/admin',
    loginPath: '/admin/login',
    logoutPath: '/admin/logout',
    componentLoader,
    resources: [
      {
        resource: new LucidResource(User, 'postgres'),
        options: {},
      }
    ],
    pages: {},
    locale: {
      availableLanguages: ['en'],
      language: 'en',
      translations: {
        en: {
          actions: {},
          messages: {},
          labels: {},
          buttons: {},
          properties: {},
          components: {},
          pages: {},
          ExampleResource: {
            actions: {},
            messages: {},
            labels: {},
            buttons: {},
            properties: {},
          },
        },
      },
    },
    branding: {
      companyName: 'Admin - AdonisJS Boilerplate',
      theme: {},
    },
    availableThemes: [dark, light, noSidebar],
    settings: {
      defaultPerPage: 10,
    },
  },
  auth: {
    enabled: true,
    provider: authProvider,
    middlewares: [],
  },
  middlewares: [],
}

export default adminjsConfig