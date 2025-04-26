import { getAgeFromISODate } from './date'

describe('getAgeFromISODate', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return the correct age when a valid ISO date is provided', () => {
    const isoDate = '1988-04-26T10:27:59.915Z'
    const currentYear = new Date().getFullYear()
    const expectedAge = currentYear - 1988

    expect(getAgeFromISODate(isoDate)).toBe(expectedAge)
  })

  it('should return undefined when no ISO date is provided', () => {
    expect(getAgeFromISODate('')).toBeUndefined()
    expect(getAgeFromISODate(null as unknown as string)).toBeUndefined()
    expect(getAgeFromISODate(undefined as unknown as string)).toBeUndefined()
  })

  it('should return NaN when receive invalid ISO date input', () => {
    expect(getAgeFromISODate('invalid-date')).toBe(NaN)
  })
})
