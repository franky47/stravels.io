// @flow

export type JWT = string

type AuthState = {
  jwt: ?JWT
}

// -----------------------------------------------------------------------------

const storeToLocalStorage = (jwt: ?JWT = null) => {
  if (jwt === null) {
    window.localStorage.removeItem('stravels-jwt')
  } else {
    window.localStorage.setItem('stravels-jwt', jwt)
  }
}

const getFromLocalStorage = (): ?JWT => {
  return window.localStorage.getItem('stravels-jwt') || null
}

// -----------------------------------------------------------------------------

const authState: AuthState = {
  jwt: null
}

// --

export default {
  init: () => {
    const jwt = getFromLocalStorage()
    authState.jwt = jwt
  },

  // --

  authenticate: (jwt: JWT) => {
    authState.jwt = jwt
    storeToLocalStorage(jwt)
  },
  logout: () => {
    authState.jwt = null
    storeToLocalStorage(null)
  },

  // --

  get jwt(): ?JWT {
    return authState.jwt
  },
  get authenticated(): boolean {
    return authState.jwt !== null
  }
}
