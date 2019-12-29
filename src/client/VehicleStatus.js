import client from '.'

export default {
  async getStatus (vin) {
    return (await client.getInstance().get(`/dashboard/vehicles/${vin}`)).data
  }
}
