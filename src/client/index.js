import axios from 'axios'

let instance

export default {
  setAuthToken(token) {
    Object.assign(
      instance.defaults, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  },
  getInstance() {
    if (typeof instance === 'undefined') {
      instance = axios.create({
        baseURL: process.env.VUE_APP_MCP_URL
      })
    }

    return instance
  }
}
