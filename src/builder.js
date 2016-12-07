import { filter, sortBy, template } from 'lodash'
import dateUtils from './date'
import dom from './dom'
import { SHORT_DAY_NAMES } from './locale'

let _state = {}

const eventsOnDate = (date) => {
  let events = filter(_state.events, (event) => {
    if (dateUtils.isBetween(date, event.start_date, event.end_date)) {
      return event
    }
  }, [])

  return sortBy(events, 'start_date')
}

export default {
  dayNames() {
    return dom.tr(SHORT_DAY_NAMES.map(dom.th).join(''))
  },

  events(date) {
    let _template = template(require('./templates/event.html'), {
      'imports': {
        date: dateUtils,
        today: date
      }
    })
    return eventsOnDate(date).map(_template).join('')
  },

  day(date) {
    let tmpl = template(require('./templates/day.html'))

    return tmpl({
      day: date.getDate(),
      date: date,
      active: dateUtils.isToday(date) ? 'active' : '',
      trailing: dateUtils.isAdjacentMonth(_state.date, date),
      events: this.events(date)
    })
  },

  week(days) {
    return dom.tr(days.map(this.day.bind(this)).join(''))
  },

  month(weeks) {
    return weeks.map(this.week.bind(this)).join('')
  },

  template(state) {
    _state = state
    let calendarTmpl = template(require('./templates/calendar.html'))

    return calendarTmpl({
      monthName: dateUtils.getMonthName(_state.date),
      year: _state.date.getFullYear(),
      header: this.dayNames(),
      weeks: this.month(dateUtils.buildWeeks(_state.date))
    })
  }
}
