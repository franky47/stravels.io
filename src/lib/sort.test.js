import * as sort from './sort'

describe('Most Recent First', () => {
  test('Equality keeps initial order', () => {
    const expected = [
      { date: '2018-01-01', name: 'Foo' },
      { date: '2018-01-01', name: 'Bar' }
    ]
    const received = expected.slice().sort(sort.byDateMostRecentFirst)
    expect(received).toEqual(expected)
  })
  test('ISO-8601 Dates', () => {
    const input = [
      { date: '2018-02-01', name: 'Feb' },
      { date: '2018-01-01', name: 'Jan' },
      { date: '2018-03-01', name: 'Mar' }
    ]
    const received = input.slice().sort(sort.byDateMostRecentFirst)
    const expected = [
      { date: '2018-03-01', name: 'Mar' },
      { date: '2018-02-01', name: 'Feb' },
      { date: '2018-01-01', name: 'Jan' }
    ]
    expect(received).toEqual(expected)
  })
})

// --

describe('Chronological order', () => {
  test('Equality keeps initial order', () => {
    const expected = [
      { date: '2018-01-01', name: 'Foo' },
      { date: '2018-01-01', name: 'Bar' }
    ]
    const received = expected.slice().sort(sort.byDateChronological)
    expect(received).toEqual(expected)
  })
  test('ISO-8601 Dates', () => {
    const input = [
      { date: '2018-02-01', name: 'Feb' },
      { date: '2018-01-01', name: 'Jan' },
      { date: '2018-03-01', name: 'Mar' }
    ]
    const received = input.slice().sort(sort.byDateChronological)
    const expected = [
      { date: '2018-01-01', name: 'Jan' },
      { date: '2018-02-01', name: 'Feb' },
      { date: '2018-03-01', name: 'Mar' }
    ]
    expect(received).toEqual(expected)
  })
})
