import { test } from '@japa/runner'
import { status, json } from './shared-examples/http_response.js'

test.group('#GET /health', (): void => {
  test('returns a 401 json status', async ({ client }): Promise<void> => {
    const response = await client.get('/health').headers({ 'x-monitoring-secret': 'wrong-secret' })

    status(response, 401)
    json(response)
  })

  test('returns 200 json status', async ({ client }): Promise<void> => {
    const response = await client
      .get('/health')
      .headers({ 'x-monitoring-secret': 'health-monitoring-secret' })

    status(response, 200)
    json(response)
  })

  test('returns correct json structure', async ({ client }): Promise<void> => {
    const response = await client
      .get('/health')
      .headers({ 'x-monitoring-secret': 'health-monitoring-secret' })

    response.assertBodyContains({
      isHealthy: true,
      status: 'warning',
      checks: [
        {
          name: 'Disk space check',
          status: 'warning',
        },
        {
          name: 'Memory heap check',
          status: 'ok',
        },
        {
          name: 'Memory RSS check',
          status: 'warning',
        },
        {
          name: 'Database health check (postgres)',
          status: 'ok',
        },
        {
          name: 'Connection count health check (postgres)',
          status: 'ok',
        },
      ],
    })
  })
})
