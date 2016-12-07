import { filter, sortBy, template } from 'lodash'
import date from './date'
import dom from './dom'

var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
var _state = {}

const eventsOnDate = function (_date) {
  let events = filter(_state.events, function (event) {
    if (date.isBetween(_date, event.start_date, event.end_date)) {
      return event
    }
  }, [])

  return sortBy(events, 'start_date')
}

export default {
  dayNames: function () {
    return dom.tr(DAY_NAMES.map(dom.th).join(''))
  },

  events: function (_date) {
    var eventTmpl = template(require('./templates/event.html'), {
      'imports': {
        'date': date,
        'today': _date
      }
    })
    return eventsOnDate(_date).map(eventTmpl).join('')
  },

  day: function (_date) {
    var dayTmpl = template(require('./templates/day.html'))

    return dayTmpl({
      day: _date.getDate(),
      date: _date,
      active: date.isToday(_date) ? 'active' : '',
      trailing: date.isAdjacentMonth(_state.date, _date),
      events: this.events(_date)
    })
  },

  week: function (days) {
    return dom.tr(days.map(this.day.bind(this)).join(''))
  },

  month: function (weeks) {
    return weeks.map(this.week.bind(this)).join('')
  },

  template: function (state) {
    _state = state
    var calendarTmpl = template(require('./templates/calendar.html'))

    return calendarTmpl({
      monthName: date.getMonthName(_state.date),
      year: _state.date.getFullYear(),
      header: this.dayNames(),
      weeks: this.month(date.buildWeeks(_state.date))
    })
  }
}
