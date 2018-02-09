const storeJwtToLocalStorage = (jwt = null) => {
  if (jwt === null) {
    window.localStorage.removeItem('stravels-jwt')
  } else {
    window.localStorage.setItem('stravels-jwt', jwt)
  }
}
const getJwtFromLocalStorage = () =>
  window.localStorage.getItem('stravels-jwt') || null

const authState = {
  jwt: null
}

// --

export default {
  init: () => {
    authState.jwt = getJwtFromLocalStorage()
  },
  authenticate: (jwt) => {
    authState.jwt = jwt
    storeJwtToLocalStorage(authState.jwt)
  },
  logout: () => {
    authState.jwt = null
    storeJwtToLocalStorage(null)
  },
  get jwt () {
    return authState.jwt
  },
  get isAuthenticated () {
    return authState.jwt !== null
  }
}
