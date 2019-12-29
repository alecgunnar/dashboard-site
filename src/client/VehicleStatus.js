import axios from "axios"

export default {
  async getStatus (vin) {
    return (await axios.get(`//localhost:8081/dashboard/vehicle/${vin}`)).data
  }
}
