// @flow

export const encodeExport = (data: Object): string => {
  try {
    return JSON.stringify(data)
  } catch (error) {
    console.error('[Export] Error encoding data:', error)
    throw error
  }
}

export const decodeImport = (data: string): Object => {
  try {
    return JSON.parse(data)
  } catch (error) {
    console.error('[Import] Error decoding data:', error)
    throw error
  }
}
