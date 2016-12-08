import { template } from './builder'

var parseDates = (events) => {
  return _.map(events, (event) => {
    if (event.start_date instanceof Date) {
      return event
    } else {
      return _.merge(event, {
        start_date: new Date(event.start_date),
        end_date: new Date(event.end_date)
      })
    }
  })
}

export default function (newDate, calendarEvents) {
  this.currentDate = newDate || this.currentDate
  this.calendarEvents = parseDates(calendarEvents || this.calendarEvents)

  let node = template(Object.assign({
    date: this.currentDate,
    events: this.calendarEvents
  }, this.events))

  this.el.innerHTML = ''
  this.el.appendChild(node)
}
