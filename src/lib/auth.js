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
  authenticate: (jwt, exp) => {
    authState.jwt = jwt
    authState.exp = exp
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
  get tokenIsAboutToExpire () {
    const now = Date.now() * 0.001
    const deadline = 3600 // 1 hour
    return authState.jwt !== null && now < authState.exp && authState.exp < now + deadline
  },
  get tokenIsValid () {
    const now = Date.now() * 0.001
    return authState.jwt !== null && authState.exp > now
  },
  get authenticated () {
    return authState.jwt !== null
  }
}
