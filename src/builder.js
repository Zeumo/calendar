import { partial } from 'lodash'
import * as dateUtils from './date'
import * as eventUtils from './events'
import { SHORT_DAY_NAMES } from './locale'

let _state = {}

export const dayNames = () => {
  let node = require('./templates/dayNames.jsx')
  return node(SHORT_DAY_NAMES)
}

export const rowSpacers = days => row => {
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
}

export const events = (days) => {
  let events = eventUtils.eventsOnWeek(days[0], _state.events)
    .map(partial(eventUtils.decorateEvent, days[0], _state))

  return eventUtils.groupNonOverlappingEvents(events)
    .map(rowSpacers(days))
}

export const day = (date) => {
  return {
    day: date.getDate(),
    date: date,
    active: dateUtils.isToday(date) ? 'active' : '',
    trailing: !dateUtils.isSameMonth(_state.date, date),
    handleDayClick: _state.handleDayClick,
  }
}

export const week = (days) => {
  let node = require('./templates/week.jsx')

  return node({
    events: events(days),
    days: days.map(day)
  })
}

export const month = (weeks) => {
  return weeks.map(week)
}

export const template = (props) => {
  _state = props
  let node = require('./templates/calendar.jsx')

  return node({
    monthName: dateUtils.getMonthName(_state.date),
    year: _state.date.getFullYear(),
    header: dayNames(),
    weeks: month(dateUtils.buildWeeks(_state.date)),
    handlePrevMonthClick: props.handlePrevMonthClick,
    handleNextMonthClick: props.handleNextMonthClick,
    handleTodayClick: props.handleTodayClick,
  })
}
