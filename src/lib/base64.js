// @flow
// from: joaquimserafim/base64-url (does not compile with react-scripts)

function unescape(str: string): string {
  return (str + '==='.slice((str.length + 3) % 4))
    .replace(/-/g, '+')
    .replace(/_/g, '/')
}

function escape(str: string): string {
  return str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export function encode(str: string): string {
  return escape(Buffer.from(str, 'utf8').toString('base64'))
}

export function decode(str: string): string {
  return Buffer.from(unescape(str), 'base64').toString('utf8')
}
