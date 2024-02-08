export const status = (response: any, httpStatus: number) => {
  response.assertStatus(httpStatus)
}

export const json = (response: any) => {
  response.assertHeader('content-type', 'application/json; charset=utf-8')
}

export const cookies = (response: any) => {
  response.assertCookie('adonisjs-boilerplate-session-development')
}
