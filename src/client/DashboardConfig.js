import client from '.'

export default {
  async getConfig () {
    return (await client.getInstance().get('/dashboard')).data
  }
}
