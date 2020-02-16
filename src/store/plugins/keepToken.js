export default (store) => {
  const token = window.localStorage.getItem('token')

  if (token) store.commit('loadToken', token)

  store.subscribe((mutation, state) => {
    if (mutation.type === 'tokenReceived')
      window.localStorage.setItem('token', state.auth.token)

    if (mutation.type === 'clearToken')
      window.localStorage.removeItem('token')
  })
}
