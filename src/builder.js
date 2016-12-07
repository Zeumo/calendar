import dateUtils from './date'
import dom from './dom'
import { SHORT_DAY_NAMES } from './locale'

let _state = {}

const eventsOnDate = (date) => {
  return (_state.events || []).filter((event) => {
    return dateUtils.isBetween(date, event.start_date, event.end_date)
  }, [])
    .sort((a, b) => a.start_date > b.start_date)
}

export default {
  dayNames() {
    let node = require('./templates/dayNames.jsx')
    return node(SHORT_DAY_NAMES)
  },

  events(date) {
    let node = require('./templates/event.jsx')

    return eventsOnDate(date)
      .map((event) => node(Object.assign(event, { today: date })))
  },

  day(date) {
    let node = require('./templates/day.jsx')
    return node({
      day: date.getDate(),
      date: date,
      active: dateUtils.isToday(date) ? 'active' : '',
      trailing: dateUtils.isAdjacentMonth(_state.date, date),
      events: this.events(date)
    })
  },

  week(days) {
    let node = require('./templates/week.jsx')
    return node(days.map(this.day.bind(this)))
  },

  month(weeks) {
    return weeks.map(this.week.bind(this))
  },

  template(state) {
    _state = state
    let node = require('./templates/calendar.jsx')

    return node({
      monthName: dateUtils.getMonthName(_state.date),
      year: _state.date.getFullYear(),
      header: this.dayNames(),
      weeks: this.month(dateUtils.buildWeeks(_state.date))
    })
  }
}
