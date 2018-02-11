import jsonwebtoken from 'jsonwebtoken'

const storeToLocalStorage = (jwt = null, exp = null) => {
  if (jwt === null) {
    window.localStorage.removeItem('stravels-jwt')
    window.localStorage.removeItem('stravels-exp')
  } else {
    window.localStorage.setItem('stravels-jwt', jwt)
    window.localStorage.setItem('stravels-exp', exp)
  }
}

const getFromLocalStorage = () => ({
  jwt: window.localStorage.getItem('stravels-jwt') || null,
  exp: window.localStorage.getItem('stravels-exp') || null
})

const authState = {
  jwt: null,
  exp: null
}

// --

export default {
  init: () => {
    const { jwt, exp } = getFromLocalStorage()
    authState.jwt = jwt
    authState.exp = exp ? parseFloat(exp) : null
  },
  authenticate: (jwt) => {
    const { exp } = jsonwebtoken.decode(jwt)
    authState.jwt = jwt
    authState.exp = parseFloat(exp)
    storeToLocalStorage(jwt, exp)
  },
  logout: () => {
    authState.jwt = null
    authState.exp = null
    storeToLocalStorage(null, null)
  },
  get jwt () {
    return authState.jwt
  },
  get isTokenValid () {
    const now = Date.now() * 0.001
    return authState.jwt !== null && authState.exp > now
  },
  get isAuthenticated () {
    return authState.jwt !== null
  }
}
