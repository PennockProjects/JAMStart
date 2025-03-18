export const dateNoonLocal = (date) => {
  if (date instanceof Date && !isNaN(date)) {
    const now = new Date()
    // puts it into current timezone to solve the day -1 problem.  i.e. Jan 1st appearing as Dec. 31 in my timezone
    const hoursToAdd = now.getTimezoneOffset() * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd);
  
    // If MidnightGMT probably means time wasn't included so set to noon instead.
    if(isMidnightGMT(date)) {
      date.setHours(12, 0, 0, 0);
    }
  }
  return new Date(date)
}

export const isMidnightGMT = (date) => {
  return (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  );
}
