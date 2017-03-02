import { chunk, range } from 'lodash'
import { LONG_MONTH_NAMES } from './locale'

const ONE_DAY = 1000 * 60 * 60 * 24

const inclusiveRange = (start, end) => range(start, end + 1)

export const startOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export const endOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export const daysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export const getMonthName = (date) => {
  return LONG_MONTH_NAMES[date.getMonth()]
}

export const startOfWeek = (date) => {
  let _date = new Date(date)
  return startOfDay(_date.setDate(_date.getDate() - _date.getDay() + 0))
}

export const endOfWeek = (date) => {
  let _date = new Date(date)
  return endOfDay(_date.setDate(_date.getDate() - _date.getDay() + 6))
}

export const startOfDay = (date) => {
  return new Date(date).setHours(0, 0, 0, 0)
}

export const endOfDay = (date) => {
  return new Date(date).setHours(23, 59, 59, 999)
}

export const differenceInDays = (endDate, startDate) => {
  return Math.round(
    (endOfDay(endDate) - startOfDay(startDate)) / ONE_DAY
  )
}

export const formatCondensedTime = (date) => {
  let hr = date.getHours()
  let min = date.getMinutes()
  let meridian = hr < 12 ? 'a' : 'p'

  hr = hr % 12 || 12
  min = min && min < 10 ? '0' + min : min

  return [hr, min && `:${min}`, meridian].filter(f => f).join('')
}

export const isBefore = (srcDate, targetDate) => {
  return new Date(srcDate) < new Date(targetDate)
}

export const isAfter = (srcDate, targetDate) => {
  return new Date(srcDate) > new Date(targetDate)
}

export const isBetween = (srcDate, startDate, endDate) => {
  return srcDate >= startOfDay(startDate) && srcDate <= endOfDay(endDate)
}

export const isSameMonth = (srcDate = new Date(), targetDate) => {
  return targetDate.getMonth() === srcDate.getMonth()
}

export const isSameDay = (srcDate, targetDate) => {
  return srcDate.toDateString() === targetDate.toDateString()
}

export const isToday = (date) => {
  return isSameDay(new Date(), date)
}

export const addMonths = (date, count = 1) => {
  return new Date(date.getFullYear(), date.getMonth() + count, 1)
}

export const subMonths = (date, count = 1) => {
  return new Date(date.getFullYear(), date.getMonth() - count, 1)
}

const toDates = (days, date) => {
  return days.map((d) => {
    return new Date(startOfDay(new Date(date).setDate(d)))
  })
}

const getRemainingDaysInMonth = (date, weeks = 6) => {
  let totalMonthSpace = daysInMonth(date) + startOfMonth(date).getDay()
  return (7 * weeks) - totalMonthSpace
}

export const buildWeeks = (date) => {
  let totalDays = daysInMonth(date)
  let prevMonth = subMonths(date, 1)
  let nextMonth = addMonths(date, 1)

  let daysPrevMonth = daysInMonth(prevMonth)
  let daysNextMonth = daysInMonth(nextMonth)

  let leadingDays = startOfMonth(date).getDay()
  let trailingDays = getRemainingDaysInMonth(date)

  let days = [
    toDates(inclusiveRange(1, daysPrevMonth).slice(daysPrevMonth - leadingDays), prevMonth),
    toDates(inclusiveRange(1, totalDays), date),
    toDates(inclusiveRange(1, daysNextMonth).slice(0, trailingDays), nextMonth)
  ].reduce((p, c) => p.concat(c), [])

  return chunk(days, 7)
}
