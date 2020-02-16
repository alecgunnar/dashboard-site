import axios from 'axios'

let instance

const getInstance = () => {
  if (typeof instance === 'undefined') {
    instance = axios.create({
      baseURL: process.env.VUE_APP_MCP_URL
    })
  }

  return instance
}

export default {
  setAuthToken(token) {
    Object.assign(
      getInstance().defaults, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  },
  getInstance
}
