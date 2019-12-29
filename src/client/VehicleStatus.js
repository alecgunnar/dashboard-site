import axios from "axios"

export default {
  async getStatus (vin) {
    return (await axios.get(`${process.env.VUE_APP_MCP_URL}dashboard/vehicle/${vin}`)).data
  }
}
