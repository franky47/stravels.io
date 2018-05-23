import { encodeStateTraversal, decodeStateTraversal } from './login'

describe('State Traversal', () => {
  test('encode + decode', () => {
    const expected = {
      foo: 'bar',
      egg: 'spam'
    }
    const received = decodeStateTraversal(encodeStateTraversal(expected))
    expect(received).toEqual(expected)
  })
})
