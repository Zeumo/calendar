import date from '../src/date'
import { includes, flatten, difference } from 'lodash'

export default {
  isOverlapping(collection, item) {
    return !collection.every((e) => {
      return date.beginningOfDay(item.start_date) > date.endOfDay(e.end_date)
    })
  },

  findNonOverlappingEvents(srcEvents, events = []) {
    return srcEvents.reduce((result, event) => {
      if (this.isOverlapping(result, event)) return result

      return result
        .concat(event)
        .sort((a, b) => new Date(a.start_date) > new Date(b.start_date))
    }, events)
  },

  groupNonOverlappingEvents(events) {
    let set = events

    return events.reduce((result, event, i) => {
      let lastResult = result[i - 1] || []
      set = difference(set, lastResult)

      if (includes(flatten(result), event) || !set.length) return result

      return result.concat([
        this.findNonOverlappingEvents(set, [event])
      ])
    }, [])
  },

  eventsOnWeek(_date, events = []) {
    let beginningOfWeek = date.beginningOfWeek(_date)
    let endOfWeek = date.endOfWeek(_date)

    return events.filter((event) => {
      return date.isBetween(event.start_date, beginningOfWeek, endOfWeek) ||
        date.isBetween(event.end_date, beginningOfWeek, endOfWeek) ||
        event.start_date < beginningOfWeek && event.end_date > endOfWeek
    })
  },

  getDistanceToEndOfWeek(weekStart, event) {
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
  },

  getContinuesDirection(weekStart, event) {
    const startsBeforeWeekStart = date.isBefore(event.start_date, weekStart)
    const endsAfterWeekEnds = date.isAfter(event.end_date, date.endOfWeek(weekStart))

    if (startsBeforeWeekStart) {
      return 'before'
    }

    if (endsAfterWeekEnds) {
      return 'after'
    }

    if (startsBeforeWeekStart && endsAfterWeekEnds) {
      return 'before-after'
    }

    return ''
  },

  decorateEvent(weekStart, event) {
    return Object.assign(event, {
      startDay: event.start_date.getDay(),
      distance: this.getDistanceToEndOfWeek(weekStart, event),
      continues: this.getContinuesDirection(weekStart, event),
      time: date.simpleTime(event.start_date),
    })
  }
}
