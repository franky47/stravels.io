import axios from 'axios'

const tokenExchangeURL = 'https://wt-92cccbcf027a1b4070443ff04b9033cc-0.sandbox.auth0-extend.com/strava-token-exchange'

const storeTokenToLocalStorage = (token = null) => new Promise(resolve => {
  if (token === null) {
    window.localStorage.removeItem('stravels-token')
  } else {
    window.localStorage.setItem('stravels-token', token)
  }
  resolve()
})
const getTokenFromLocalStorage = () =>
  window.localStorage.getItem('stravels-token') || null

const authState = {
  token: null
}

// --

export default {
  init: () => {
    authState.token = getTokenFromLocalStorage()
  },
  exchangeToken: async (code) => {
    const res = await axios.get(tokenExchangeURL, {
      params: { code }
    })
    return res.data.token
  },
  authenticate: (token) => {
    authState.token = token
    return storeTokenToLocalStorage(authState.token)
  },
  logout: () => {
    authState.token = null
    return storeTokenToLocalStorage(null)
  },
  get token () {
    return authState.token
  },
  get isAuthenticated () {
    return authState.token !== null
  }
}
