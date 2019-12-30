import client from '.'

export default {
  async getToken () {
    return (await client.getInstance().post('/auth/token')).data
  }
}
