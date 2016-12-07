import builder from './builder'

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

  this.el.innerHTML = builder.template({
    date: this.currentDate,
    events: this.calendarEvents
  })
}
