// @flow

import * as base64 from './base64'
import { qsEncode } from './utility'

const isProd: boolean = process.env.NODE_ENV === 'production'

// -----------------------------------------------------------------------------

export const encodeStateTraversal = (data: Object = {}): string => {
  try {
    return base64.encode(JSON.stringify(data))
  } catch (error) {
    console.error('[Login] Error encoding state traversal', error)
    return ''
  }
}

export const decodeStateTraversal = (data: string = ''): ?Object => {
  try {
    return JSON.parse(base64.decode(data))
  } catch (error) {
    console.error('[Login] Error decoding state traversal', error)
    return null
  }
}

// -----------------------------------------------------------------------------

export const getStravaOAuthURL = (stateToTraverse: Object = {}): string => {
  const url = 'https://www.strava.com/oauth/authorize'
  const host = isProd
    ? `${window.location.protocol}//${window.location.host}`
    : `http://localhost:${window.location.port}`
  const query = {
    client_id: 19454,
    redirect_uri: `${host}/login`,
    response_type: 'code',
    approval_prompt: isProd ? 'auto' : 'force',
    scope: 'view_private',
    state: encodeStateTraversal(stateToTraverse)
  }
  return url + '?' + qsEncode(query)
}
