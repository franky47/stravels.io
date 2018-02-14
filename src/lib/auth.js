const storeToLocalStorage = (jwt = null) => {
  if (jwt === null) {
    window.localStorage.removeItem('stravels-jwt')
  } else {
    window.localStorage.setItem('stravels-jwt', jwt)
  }
}

const getFromLocalStorage = () =>
  window.localStorage.getItem('stravels-jwt') || null

const authState = {
  jwt: null
}

// --

export default {
  init: () => {
    const jwt = getFromLocalStorage()
    authState.jwt = jwt
  },
  authenticate: (jwt) => {
    authState.jwt = jwt
    storeToLocalStorage(jwt)
  },
  logout: () => {
    authState.jwt = null
    storeToLocalStorage(null)
  },
  get jwt () {
    return authState.jwt
  },
  get authenticated () {
    return authState.jwt !== null
  }
}
