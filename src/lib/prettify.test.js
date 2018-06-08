import * as prettify from './prettify'

describe('Date Range', () => {
  test('Same month', () => {
    const received = prettify.dateRange('2018-06-12', '2018-06-23')
    const expected = '12th - 23rd June 2018'
    expect(received).toEqual(expected)
  })
  test('Same year', () => {
    const received = prettify.dateRange('2017-03-12', '2017-07-22')
    const expected = '12th March - 22nd July 2017'
    expect(received).toEqual(expected)
  })
  test('Different years', () => {
    const received = prettify.dateRange('2017-03-12', '2018-07-13')
    const expected = 'March 2017 - July 2018'
    expect(received).toEqual(expected)
  })
  test('Same day', () => {
    const received = prettify.dateRange('2018-07-13', '2018-07-13')
    const expected = '13th July 2018'
    expect(received).toEqual(expected)
  })
})

describe('Stats', () => {
  describe('Distance', () => {
    test('Should render to kilometers', () => {
      const received = prettify.distanceAsKm(12420)
      const expected = '12.42'
      expect(received).toEqual(expected)
    })
  })
  describe('Elevation', () => {
    test('Should drop decimals', () => {
      const received = prettify.elevation(1242.1234)
      const expected = '1242'
      expect(received).toEqual(expected)
    })
  })
  describe('Duration', () => {
    test('Should have format hh:mm:ss', () => {
      const received = prettify.duration(3600 * 24 - 1)
      const expected = '23:59:59'
      expect(received).toEqual(expected)
    })
  })
  describe('Speed', () => {
    test('Should render to km/h', () => {
      const received = prettify.speed(10)
      const expected = '36.0'
    })
  })
})
