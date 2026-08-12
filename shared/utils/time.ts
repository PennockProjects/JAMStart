export const dateNoonLocal = (date: Date) => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    const now = new Date()
    // puts it into current timezone to solve the day -1 problem. i.e. Jan 1st appearing as Dec. 31 in my timezone
    const hoursToAdd = now.getTimezoneOffset() * 60 * 1000
    date.setTime(date.getTime() + hoursToAdd)

    // If MidnightGMT probably means time wasn't included so set to noon instead.
    if (isMidnightGMT(date)) {
      date.setHours(12, 0, 0, 0)
    }
  }
  return new Date(date)
}

export const dateStringToDateNoonLocal = (dateString: string) => {
  if (typeof dateString !== 'string') {
    return new Date(NaN)
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString.trim())
  if (!match) {
    return new Date(NaN)
  }

  const year = Number(match[1])
  const monthIndex = Number(match[2]) - 1
  const day = Number(match[3])
  const result = new Date(year, monthIndex, day, 12, 0, 0, 0)

  // Reject invalid calendar dates such as 2026-02-31.
  if (
    result.getFullYear() !== year ||
    result.getMonth() !== monthIndex ||
    result.getDate() !== day
  ) {
    return new Date(NaN)
  }

  return result
}

export const normalizeDateToNoon = (dateInput?: string | null) => {
  const dateRaw = typeof dateInput === 'string' ? dateInput.trim() : ''

  if (!dateRaw) {
    return new Date().toLocaleDateString()
  }

  // Accept YYYY-MM-DD or strings with extra time/timezone data by using only the date prefix.
  const dateMatch = dateRaw.match(/^(\d{4}-\d{2}-\d{2})/)
  if (!dateMatch) {
    return new Date().toLocaleDateString()
  }

  const datePrefix = dateMatch[1]
  if (!datePrefix) {
    return new Date().toLocaleDateString()
  }

  const localNoon = dateStringToDateNoonLocal(datePrefix)
  if (Number.isNaN(localNoon.getTime())) {
    return new Date().toLocaleDateString()
  }

  return localNoon.toLocaleDateString()
}

export const isMidnightGMT = (date: Date) => {
  return (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  )
}
