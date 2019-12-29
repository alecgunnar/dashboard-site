import axios from "axios"

export default {
  async getConfig () {
    return (await axios.get(`${process.env.VUE_APP_MCP_URL}dashboard`)).data
  }
}
