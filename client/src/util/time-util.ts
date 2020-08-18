/**
 * Whether the current timestamp falls within trading hours
 * 13:30 GMT - 20:30 GMT and is a weekday
 * @param now - ISO datetime string
 */
export const isTradingDate = (now: string = new Date().toISOString()) => {
  const nowDate = new Date(now);
  // Timezone offset converted from minutes to hours
  const tzOffsetHr = nowDate.getTimezoneOffset() / 60;
  const currentHour = nowDate.getHours();
  // Relative to 60 minutes as we'll add this to the hour
  const currentMinute = nowDate.getMinutes() / 60;
  const currentHourMin = tzOffsetHr + currentHour + currentMinute;
  const currentWeekDay = nowDate.getDay();

  const isTrading = currentHourMin >= 13.5 && currentHourMin <= 20.5;
  const isWeekday = currentWeekDay >= 1 && currentWeekDay <= 5;

  return isTrading && isWeekday;
};
