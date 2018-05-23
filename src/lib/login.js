// @flow

import base64 from './base64'
import { qsEncode } from './utility'

const isProd: boolean = process.env.NODE_ENV === 'production'

// -----------------------------------------------------------------------------

export const encodeStateTraversal = (data: any = {}): string => {
  return base64.encode(JSON.stringify(data))
}

export const decodeStateTraversal = (data: string = ''): any => {
  return JSON.parse(base64.decode(data))
}

// -----------------------------------------------------------------------------

export const getStravaOAuthURL = (stateToTraverse: any = {}): string => {
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
