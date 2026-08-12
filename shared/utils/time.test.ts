import { afterEach, describe, expect, it, vi } from 'vitest'
import { dateNoonLocal, dateStringToDateNoonLocal, isMidnightGMT, normalizeDateToNoon } from './time'

describe('isMidnightGMT', () => {
  it('returns true when the UTC time is exactly midnight', () => {
    const date = new Date('2026-01-01T00:00:00.000Z')

    expect(isMidnightGMT(date)).toBe(true)
  })

  it('returns false when the UTC time is not midnight', () => {
    const date = new Date('2026-01-01T12:00:00.000Z')

    expect(isMidnightGMT(date)).toBe(false)
  })
})

describe('dateNoonLocal', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('moves a midnight-adjusted date to noon local time', () => {
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(0)

    const input = new Date('2026-01-01T00:00:00.000Z')
    const result = dateNoonLocal(input)

    expect(result).not.toBe(input)
    expect(result.getHours()).toBe(12)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
    expect(result.getHours()).toBe(12)
  })

  it('keeps a non-midnight-adjusted date unchanged apart from cloning', () => {
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(0)

    const input = new Date('2026-01-01T01:30:00.000Z')
    const original = new Date(input)
    const result = dateNoonLocal(input)

    expect(result).not.toBe(input)
    expect(result.getHours()).toBe(original.getHours())
    expect(result.getMinutes()).toBe(original.getMinutes())
    expect(isMidnightGMT(result)).toBe(false)
  })

    it('keeps a non-midnight-adjusted Jan. 1 date in January', () => {
    vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(0)

    const input = new Date('2026-01-01T00:30:00.000Z')
    const original = new Date(input)
    const result = dateNoonLocal(input)

    expect(result).not.toBe(input)
    expect(result.getMonth()).toBe(original.getMonth())
    expect(result.getHours()).toBe(original.getHours())
    expect(result.getMinutes()).toBe(original.getMinutes())
    expect(isMidnightGMT(result)).toBe(false)
  })

})

describe('dateStringToDateNoonLocal', () => {
  it('parses YYYY-MM-DD and returns that date at local noon', () => {
    const result = dateStringToDateNoonLocal('2026-01-05')

    expect(Number.isNaN(result.getTime())).toBe(false)
    expect(result.getFullYear()).toBe(2026)
    expect(result.getMonth()).toBe(0)
    expect(result.getDate()).toBe(5)
    expect(result.getHours()).toBe(12)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
  })

  it('returns invalid date when format is not YYYY-MM-DD', () => {
    const result = dateStringToDateNoonLocal('01/05/2026')

    expect(Number.isNaN(result.getTime())).toBe(true)
  })

  it('returns invalid date for impossible calendar dates', () => {
    const result = dateStringToDateNoonLocal('2026-02-31')

    expect(Number.isNaN(result.getTime())).toBe(true)
  })
})

describe('normalizeDateToNoon', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('uses today when input is blank or null', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-13T12:00:00.000Z'))

    const expected = new Date().toLocaleDateString()
    expect(normalizeDateToNoon('')).toBe(expected)
    expect(normalizeDateToNoon(null)).toBe(expected)
  })

  it('ignores time/timezone suffix and uses local noon for YYYY-MM-DD', () => {
    const result = normalizeDateToNoon('2026-01-05T23:59:59+14:00')
    const expected = new Date(2026, 0, 5, 12, 0, 0, 0).toLocaleDateString()

    expect(result).toBe(expected)
  })
})
