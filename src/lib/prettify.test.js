import { prettifyDateRange } from './prettify'

describe('Date Range', () => {
  test('Same month', () => {
    const received = prettifyDateRange(
      new Date('2018-06-12'),
      new Date('2018-06-23')
    )
    const expected = '12th - 23rd June 2018'
    expect(received).toEqual(expected)
  })
  test('Same year', () => {
    const received = prettifyDateRange(
      new Date('2017-03-12'),
      new Date('2017-07-13')
    )
    const expected = '12th March - 13th July 2017'
    expect(received).toEqual(expected)
  })
  test('Different years', () => {
    const received = prettifyDateRange(
      new Date('2017-03-12'),
      new Date('2018-07-13')
    )
    const expected = 'March 2017 - July 2018'
    expect(received).toEqual(expected)
  })
})
