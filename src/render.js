import { assign } from 'lodash'
import { template } from './builder'

const parseDates = (events) => {
  return events.map((event) => {
    if (event.start_date instanceof Date) {
      return event
    } else {
      return assign(event, {
        start_date: new Date(event.start_date),
        end_date: new Date(event.end_date)
      })
    }
  })
}

export default function (newDate, calendarEvents) {
  this.currentDate = newDate || this.currentDate
  this.calendarEvents = parseDates(calendarEvents || this.calendarEvents)

  let node = template(assign({
    date: this.currentDate,
    events: this.calendarEvents
  }, this.events))

  this.el.innerHTML = ''
  this.el.appendChild(node)
}
