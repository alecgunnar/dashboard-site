import client from '.'

export default {
  async getToken (username, password) {
    const response = await client.getInstance().post('/auth/token', {
      username,
      password
    })

    return response.data
  }
}
