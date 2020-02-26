import AuthClient from '@/client/Auth'

export default {
  state: {
    token: null,
    signInFailed: false
  },
  mutations: {
    tokenReceived(state, {token}) {
      state.token = token
    },
    clearToken(state) {
      state.token = null
    },
    tryingToSignIn(state) {
      state.signInFailed = false
    },
    credentialsRejected(state) {
      state.signInFailed = true
    }
  },
  actions: {
    signIn({commit}, {username, password}) {
      commit('tryingToSignIn')

      AuthClient.getToken(username, password)
        .then((token) => commit('tokenReceived', token))
        .catch(() => credentialsRejected())
    },
    loadToken({commit}, token) {
      const claims = token.split('.')[1]
      const parsedClaims = JSON.parse(atob(claims))
      const expiresAt = parsedClaims['exp'] * 1000

      if (expiresAt < Date.now())return commit('clearToken')

      commit('tokenReceived', {token})
    }
  },
  getters: {
    credentialsWereRejected: (state) => state.signInFailed,
    isAuthenticated: (state) => state.token !== null,
    token: (state) => state.token
  }
}