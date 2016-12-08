import { partial } from 'lodash'
import * as dateUtils from './date'
import * as eventUtils from './events'
import { SHORT_DAY_NAMES } from './locale'

let _state = {}

export default {
  dayNames() {
    let node = require('./templates/dayNames.jsx')
    return node(SHORT_DAY_NAMES)
  },

  rowSpacers: days => row => {
    let offset = 0

    return row.reduce((result, event, i) => {
      let spacer = event
      let lastEvent = result[i - 1]

      offset = lastEvent
        ? lastEvent.distance - event.startDay
        : event.startDay

      if (event.start_date < days[0]) {
        offset = 0
      }

      if (offset) {
        spacer = [
          {
            spacer: true,
            colSpan: offset,
          },
          event
        ]
      }

      return result.concat(spacer)
    }, [])
  },

  events(days) {
    let events = eventUtils.eventsOnWeek(days[0], _state.events)
      .map(partial(eventUtils.decorateEvent, days[0]))

    return eventUtils.groupNonOverlappingEvents(events)
      .map(this.rowSpacers(days))
  },

  day(date) {
    return {
      day: date.getDate(),
      date: date,
      active: dateUtils.isToday(date) ? 'active' : '',
      trailing: !dateUtils.isSameMonth(_state.date, date),
    }
  },

  week(days) {
    let node = require('./templates/week.jsx')

    return node({
      events: this.events(days),
      days: days.map(this.day)
    })
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
