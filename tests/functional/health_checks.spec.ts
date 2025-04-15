import { test } from '@japa/runner'
import { status, json } from './shared-examples/http_response.js'

test.group('#GET /health', (): void => {
  test('returns a 401 json status', async ({ client }): Promise<void> => {
    const response = await client.get('/health').headers({ 'x-monitoring-secret': 'wrong-secret' })

    status(response, 401)
    json(response)
  })
})
