import * as date from '../src/date'
import { flatten, difference } from 'lodash'

export const isOverlapping = (collection, item) => {
  return !collection.every((e) => {
    return date.beginningOfDay(item.start_date) > date.endOfDay(e.end_date)
  })
}

export const findNonOverlappingEvents = (srcEvents, events = []) => {
  return srcEvents.reduce((result, event) => {
    if (isOverlapping(result, event)) return result

    return result
      .concat(event)
      .sort((a, b) => new Date(a.start_date) > new Date(b.start_date))
  }, events)
}

export const groupNonOverlappingEvents = (events) => {
  let set = events

  return events.reduce((result, event, i) => {
    let lastResult = result[i - 1] || []
    set = difference(set, lastResult)

    if (flatten(result).includes(event) || !set.length) return result

    return result.concat([
      findNonOverlappingEvents(set, [event])
    ])
  }, [])
}

export const eventsOnWeek = (_date, events = []) => {
  let beginningOfWeek = date.beginningOfWeek(_date)
  let endOfWeek = date.endOfWeek(_date)

  return events.filter((event) => {
    return date.isBetween(event.start_date, beginningOfWeek, endOfWeek) ||
      date.isBetween(event.end_date, beginningOfWeek, endOfWeek) ||
      event.start_date < beginningOfWeek && event.end_date > endOfWeek
  })
}

export const getDistanceToEndOfWeek = (weekStart, event) => {
  let startDay = event.start_date.getDay()
  let distanceInDays = date.distanceInDays(event.start_date, event.end_date)
  let endDay = startDay + distanceInDays

  if (date.isAfter(event.start_date, weekStart)) {
    let distanceToEndOfWeek = 7 - startDay
    return endDay > 7 ? distanceToEndOfWeek : distanceInDays
  }

  if (date.isBefore(event.start_date, weekStart)) {
    if (date.isAfter(event.end_date, date.endOfWeek(weekStart))) {
      return 7
    }

    if (date.isBefore(event.end_date, date.endOfWeek(weekStart))) {
      return endDay % 7
    }
  }
}

export const getContinuesDirection = (weekStart, event) => {
  const startsBeforeWeekStart = date.isBefore(event.start_date, weekStart)
  const endsAfterWeekEnds = date.isAfter(event.end_date, date.endOfWeek(weekStart))

  if (startsBeforeWeekStart && endsAfterWeekEnds) {
    return 'before-after'
  }

  if (startsBeforeWeekStart) {
    return 'before'
  }

  if (endsAfterWeekEnds) {
    return 'after'
  }

  return ''
}

export const decorateEvent = (weekStart, state, event) => {
  let continues = getContinuesDirection(weekStart, event)
  let { start_date, end_date } = event
  let eventId = Date.parse(start_date) + Date.parse(end_date)

  return Object.assign(event, {
    eventId,
    continues,
    startDay: event.start_date.getDay(),
    distance: getDistanceToEndOfWeek(weekStart, event),
    startTime: date.formatSimpleTime(event.start_date),
    showStartTime: continues === 'after' || continues === '',
    handleEventMouseEnter: state.handleEventMouseEnter,
    handleEventMouseLeave: state.handleEventMouseLeave,
  })
}
