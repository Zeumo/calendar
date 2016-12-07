import { take, takeRight, chunk, range } from 'lodash'
import { LONG_MONTH_NAMES } from './locale'

const inclusiveRange = function (start, end) {
  return range(start, end + 1)
}

export default {
  beginningOfMonth: function (date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  },

  endOfMonth: function (date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  },

  daysInMonth: function(date) {
    return new Date(date.getYear(), date.getMonth() + 1, 0).getDate()
  },

  getMonthName: function (date) {
    return LONG_MONTH_NAMES[date.getMonth()]
  },

  simpleTime: function (date) {
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
  },

  isBetween: function (srcDate, startDate, endDate) {
    let _srcDate   = new Date(srcDate).setHours(0,0,0,0)
    let _startDate = new Date(startDate).setHours(0,0,0,0)
    let _endDate   = new Date(endDate).setHours(0,0,0,0)

    return _srcDate >= _startDate && srcDate <= _endDate
  },

  isAdjacentMonth: function (srcDate, trailingDate) {
    srcDate = srcDate || new Date()
    let srcMonth = srcDate.getMonth()
    let trailingMonth = trailingDate.getMonth()

    return trailingMonth !== srcMonth
  },

  isSameDay: function (srcDate, targetDate) {
    return srcDate.toString() === targetDate.toString()
  },

  isToday: function (date) {
    return this.isSameDay(new Date(), date)
  },

  nextMonthDate: function (currentDate) {
    let date, currentMonth = currentDate.getMonth()

    if (currentMonth === 11) {
      date = new Date(currentDate.getFullYear() + 1, 0, 1)
    } else {
      date = new Date(currentDate.getFullYear(), currentMonth + 1, 1)
    }

    return date
  },

  prevMonthDate: function (currentDate) {
    let date, currentMonth = currentDate.getMonth()

    if (currentMonth === 0) {
      date = new Date(currentDate.getFullYear() - 1, 11, 1)
    } else {
      date = new Date(currentDate.getFullYear(), currentMonth - 1, 1)
    }

    return date
  },

  // [
  //   [01, 02, 03, 04, 05, 06, 07],
  //   [08, 09, 10, 11, 12, 13, 14],
  //   [15, 16, 17, 18, 19, 20, 21],
  //   [22, 23, 24, 25, 26, 27, 28],
  //   [29, 30, 31],
  // ]
  buildWeeks: function (date) {
    let totalDays = this.daysInMonth(date)
    let prevMonthDate = this.prevMonthDate(date)
    let nextMonthDate = this.nextMonthDate(date)

    let daysPrevMonth = this.daysInMonth(prevMonthDate)
    let daysNextMonth = this.daysInMonth(nextMonthDate)

    // 0 = Sun, 1 = Mon, 2, Tues, ...
    let firstDayOffset = this.beginningOfMonth(date).getDay()

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
    days = days.concat(toDates(nextDays, nextMonthDate))

    // [29, 30, 1, 2, 3, 4, 5, ... 31]
    let prevDays = takeRight(inclusiveRange(1, daysPrevMonth), firstDayOffset)
    days = toDates(prevDays, prevMonthDate).concat(days)

    return chunk(days, 7)
  }
}
