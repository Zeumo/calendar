import { assign, includes, difference } from 'lodash'
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  isBetween,
  differenceInDays,
  isAfter,
  isBefore,
  formatCondensedTime,
} from '../src/date'

const flatten = (arr) => arr.reduce((p, c) => p.concat(c), [])

export const isOverlapping = (collection, item) => {
  return !collection.every((e) => {
    return startOfDay(item.start_date) > endOfDay(e.end_date)
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

    if (includes(flatten(result), event) || !set.length) return result

    return result.concat([
      findNonOverlappingEvents(set, [event])
    ])
  }, [])
}

export const eventsOnWeek = (date, events = []) => {
  let _startOfWeek = startOfWeek(date)
  let _endOfWeek = endOfWeek(date)

  return events.filter((event) => {
    return isBetween(event.start_date, _startOfWeek, _endOfWeek) ||
      isBetween(event.end_date, _startOfWeek, _endOfWeek) ||
      event.start_date < _startOfWeek && event.end_date > _endOfWeek
  })
}

export const getDistanceToEndOfWeek = (weekStart, event) => {
  let startDay = event.start_date.getDay()
  let distanceInDays = differenceInDays(event.end_date, event.start_date)
  let endDay = startDay + distanceInDays

  if (isAfter(event.start_date, weekStart)) {
    let distanceToEndOfWeek = 7 - startDay
    return endDay > 7 ? distanceToEndOfWeek : distanceInDays
  }

  if (isBefore(event.start_date, weekStart)) {
    if (isAfter(event.end_date, endOfWeek(weekStart))) {
      return 7
    }

    if (isBefore(event.end_date, endOfWeek(weekStart))) {
      return endDay % 7
    }
  }
}

export const getContinuesDirection = (weekStart, event) => {
  const startsBeforeWeekStart = isBefore(event.start_date, weekStart)
  const endsAfterWeekEnds = isAfter(event.end_date, endOfWeek(weekStart))

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

  return assign(event, {
    eventId,
    continues,
    startDay: event.start_date.getDay(),
    distance: getDistanceToEndOfWeek(weekStart, event),
    startTime: formatCondensedTime(event.start_date),
    showStartTime: continues === 'after' || continues === '',
    handleEventMouseEnter: state.handleEventMouseEnter,
    handleEventMouseLeave: state.handleEventMouseLeave,
  })
}
