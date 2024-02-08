import emitter from '@adonisjs/core/services/emitter'
import string from '@adonisjs/core/helpers/string'
import logger from '@adonisjs/core/services/logger'
import db from '@adonisjs/lucid/services/db'
import app from '@adonisjs/core/services/app'

// HTTP
emitter.on('http:request_completed', (event) => {
  const method = event.ctx.request.method()
  const url = event.ctx.request.url(true)
  const duration = event.duration
  const status = event.ctx.response.response.statusCode
  const statusMessage = event.ctx.response.response.statusMessage

  logger.info(
    `[HTTP] - ${method} ${url}: ${string.prettyHrTime(duration)} - ${status} ${statusMessage}`
  )
})

// DB
emitter.on('db:query', (query) => {
  if (app.inProduction) {
    logger.debug(`[DATABASE] - ${query}`)
  } else {
    db.prettyPrint(query)
  }
})

// EMAIL
emitter.on('mail:sending', (event) => {
  if (app.inProduction) {
    logger.info(`[SMTP] - Email sent: ${event.views.html?.template}`)
  } else {
    logger.info(`[SMTP] - Template ${event.views.html?.template}`)
    logger.info(
      `[SMTP] - Email sent to ${event.message.to} from ${event.message.from} with subject ${event.message.subject}`
    )
  }
})
