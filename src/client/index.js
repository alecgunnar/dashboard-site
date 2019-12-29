import axios from 'axios'

let instance

export default {
  getInstance() {
    if (typeof instance === 'undefined') {
      instance = axios.create({
        baseURL: process.env.VUE_APP_MCP_URL,
        headers: {
          'Authorization': 'abc123'
        }
      })
    }

    return instance
  }
}
