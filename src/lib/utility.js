export const qsEncode = (obj = {}) => {
  const qsify = key => [key, obj[key]].map(encodeURIComponent).join('=')
  return Object.keys(obj).map(qsify).join('&')
}

export const qsDecode = (qs = '') => {
  const reducer = (obj, pair) => {
    const [ key, value ] = pair.split('=').map(decodeURIComponent)
    obj[key] = value
    return obj
  }
  return qs
    .slice(qs[0] === '?' ? 1 : 0) // Remove leading '?' if any
    .split('&')
    .reduce(reducer, {})
}
