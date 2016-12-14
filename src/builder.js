import { eventsOnWeek, decorateEvent, groupNonOverlappingEvents } from './events'
import { isToday, isSameMonth, getMonthName, buildWeeks } from './date'
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
  let events = eventsOnWeek(days[0], _state.events)
    .map((event) => decorateEvent(days[0], _state, event))

  return groupNonOverlappingEvents(events)
    .map(rowSpacers(days))
}

export const day = (date) => {
  return {
    day: date.getDate(),
    date: date,
    active: isToday(date) ? 'active' : '',
    trailing: !isSameMonth(_state.date, date),
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
    monthName: getMonthName(_state.date),
    year: _state.date.getFullYear(),
    header: dayNames(),
    weeks: month(buildWeeks(_state.date)),
    handlePrevMonthClick: props.handlePrevMonthClick,
    handleNextMonthClick: props.handleNextMonthClick,
    handleTodayClick: props.handleTodayClick,
  })
}
