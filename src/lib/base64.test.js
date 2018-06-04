import * as base64 from './base64'

describe('Base64', () => {
  describe('Encode', () => {
    test('Empty string', () => {
      const received = base64.encode('')
      const expected = ''
      expect(received).toEqual(expected)
    })
    test('Text', () => {
      const received = base64.encode('Lorem ipsum dolor sit amet')
      const expected = 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQ' // No padding
      expect(received).toEqual(expected)
    })
  })
  describe('Decode', () => {
    test('Empty string', () => {
      const received = base64.decode('')
      const expected = ''
      expect(received).toEqual(expected)
    })
    test('Text', () => {
      const received = base64.decode('TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQ')
      const expected = 'Lorem ipsum dolor sit amet'
      expect(received).toEqual(expected)
    })
  })
})
