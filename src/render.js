var builder = require('./builder')

var parseDates = function(events) {
  return _.map(events, function(event) {
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

module.exports = function (newDate, calendarEvents) {
  this.currentDate = newDate || this.currentDate
  this.calendarEvents = parseDates(calendarEvents || this.calendarEvents)

  this.el.innerHTML = builder.template({
    date: this.currentDate,
    events: this.calendarEvents
  })
}
