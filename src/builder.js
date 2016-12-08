import dateUtils from './date'
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

  week(days) {
    let node = require('./templates/week.jsx')
    return node(days.map((date) => {
      return {
        day: date.getDate(),
        date: date,
        active: dateUtils.isToday(date) ? 'active' : '',
        trailing: !dateUtils.isSameMonth(_state.date, date),
        events: this.events(date)
      }
    }))
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
