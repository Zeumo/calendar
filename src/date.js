import { take, takeRight, chunk, range } from 'lodash'
import { LONG_MONTH_NAMES } from './locale'

const ONE_DAY = 1000 * 60 * 60 * 24

const inclusiveRange = (start, end) => range(start, end + 1)

export const beginningOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export const endOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export const daysInMonth = (date) => {
  return new Date(date.getYear(), date.getMonth() + 1, 0).getDate()
}

export const getMonthName = (date) => {
  return LONG_MONTH_NAMES[date.getMonth()]
}

export const beginningOfWeek = (date) => {
  let _date = new Date(date)
  return beginningOfDay(_date.setDate(_date.getDate() - _date.getDay() + 0))
}

export const endOfWeek = (date) => {
  let _date = new Date(date)
  return endOfDay(_date.setDate(_date.getDate() - _date.getDay() + 6))
}

export const beginningOfDay = (date) => {
  return new Date(date).setHours(0, 0, 0, 0)
}

export const endOfDay = (date) => {
  return new Date(date).setHours(23, 59, 59, 999)
}

export const distanceInDays = (startDate, endDate) => {
  return Math.round(
    Math.abs(
      (beginningOfDay(startDate) - endOfDay(endDate)) / ONE_DAY
    )
  )
}

export const simpleTime = (date) => {
  let str = []
  let hr = date.getHours()
  let min = date.getMinutes()
  min = min && min < 10 ? '0' + min : min

  let meridian = hr < 12 ? 'a' : 'p'
  hr = hr % 12 || 12

  str.push(hr)
  min && str.push(':' + min)
  str.push(meridian)

  return str.join('')
}

export const isBefore = (srcDate, targetDate) => {
  return new Date(srcDate) < new Date(targetDate)
}

export const isAfter = (srcDate, targetDate) => {
  return new Date(srcDate) > new Date(targetDate)
}

export const isBetween = (srcDate, startDate, endDate) => {
  let _srcDate   = beginningOfDay(srcDate)
  let _startDate = beginningOfDay(startDate)
  let _endDate   = endOfDay(endDate)

  return _srcDate >= _startDate && srcDate <= _endDate
}

export const isSameMonth = (srcDate = new Date(), targetDate) => {
  let srcMonth = srcDate.getMonth()
  let targetMonth = targetDate.getMonth()

  return targetMonth === srcMonth
}

export const isSameDay = (srcDate, targetDate) => {
  return srcDate.toDateString() === targetDate.toDateString()
}

export const isToday = (date) => {
  return isSameDay(new Date(), date)
}

export const nextMonthDate = (currentDate) => {
  let date, currentMonth = currentDate.getMonth()

  if (currentMonth === 11) {
    date = new Date(currentDate.getFullYear() + 1, 0, 1)
  } else {
    date = new Date(currentDate.getFullYear(), currentMonth + 1, 1)
  }

  return date
}

export const prevMonthDate = (currentDate) => {
  let date, currentMonth = currentDate.getMonth()

  if (currentMonth === 0) {
    date = new Date(currentDate.getFullYear() - 1, 11, 1)
  } else {
    date = new Date(currentDate.getFullYear(), currentMonth - 1, 1)
  }

  return date
}

// [
//   [01, 02, 03, 04, 05, 06, 07],
//   [08, 09, 10, 11, 12, 13, 14],
//   [15, 16, 17, 18, 19, 20, 21],
//   [22, 23, 24, 25, 26, 27, 28],
//   [29, 30, 31],
// ]
export const buildWeeks = (date) => {
  let totalDays = daysInMonth(date)
  let prevMonth = prevMonthDate(date)
  let nextMonth = nextMonthDate(date)

  let daysPrevMonth = daysInMonth(prevMonth)
  let daysNextMonth = daysInMonth(nextMonth)

  // 0 = Sun, 1 = Mon, 2, Tues, ...
  let firstDayOffset = beginningOfMonth(date).getDay()

  const toDates = function (days, _date) {
    return days.map(function (d) {
      return new Date(new Date(_date).setDate(d))
    })
  }

  // [1, 2, 3, 4, 5, ... 31]
  let days = toDates(inclusiveRange(1, totalDays), date)

  let remainingDays = 7 - ((totalDays + firstDayOffset) % 7)
  remainingDays = (totalDays + firstDayOffset) / 7 < 5
    ? remainingDays + 7
    : remainingDays

    // [29, 30, 31, 1, 2, 3, 4]
  let nextDays = take(inclusiveRange(1, daysNextMonth), remainingDays)
  days = days.concat(toDates(nextDays, nextMonth))

  // [29, 30, 1, 2, 3, 4, 5, ... 31]
  let prevDays = takeRight(inclusiveRange(1, daysPrevMonth), firstDayOffset)
  days = toDates(prevDays, prevMonth).concat(days)

  return chunk(days, 7)
}
