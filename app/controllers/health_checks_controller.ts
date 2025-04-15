import env from '#start/env'
import { healthChecks } from '#start/health'
import type { HttpContext } from '@adonisjs/core/http'

export default class HealthChecksController {
  async handle({ request, response }: HttpContext) {
    if (request.header('x-monitoring-secret') !== env.get('HEALTH_MONITORING_SECRET')) {
      return response.unauthorized({ message: 'Unauthorized access' })
    }

    const report = await healthChecks.run()

    if (report.isHealthy) {
      return response.ok(report)
    }

    return response.serviceUnavailable(report)
  }
}
