import { qsEncode, qsDecode } from './utility'

describe('Query String Encode', () => {
  test('returns a string', () => {
    const expected = 'string'
    const received = typeof qsEncode({ foo: 'bar' })
    expect(received).toEqual(expected)
  })
  test('empty object returns empty string', () => {
    const expected = ''
    const received = qsEncode()
    expect(received).toEqual(expected)
  })
  test('correctly encodes simple names', () => {
    const expected = 'foo=bar&egg=spam'
    const received = qsEncode({ foo: 'bar', egg: 'spam' })
    expect(received).toEqual(expected)
  })
  test('correctly encodes complex names', () => {
    const expected = 'foo%20bar=egg%20spam'
    const received = qsEncode({ 'foo bar': 'egg spam' })
    expect(received).toEqual(expected)
  })
})

// --

describe('Query String Decode', () => {
  test('returns an object', () => {
    const expected = 'object'
    const received = typeof qsDecode()
    expect(received).toEqual(expected)
  })
  test('empty string returns empty object', () => {
    const expected = {}
    const received = qsDecode()
    expect(received).toEqual(expected)
  })
  test('correctly decodes simple names', () => {
    const expected = { foo: 'bar', egg: 'spam' }
    const received = qsDecode('foo=bar&egg=spam')
    expect(received).toEqual(expected)
  })
  test('correctly decodes complex names', () => {
    const expected = { 'foo bar': 'egg spam' }
    const received = qsDecode('foo%20bar=egg%20spam')
    expect(received).toEqual(expected)
  })
})
