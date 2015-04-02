var builder = require('./builder');

module.exports = function (newDate, calendarEvents) {
  this.currentDate = newDate || this.currentDate;
  this.calendarEvents = calendarEvents || this.calendarEvents;

  this.el.innerHTML = builder.template({
    date: this.currentDate,
    events: this.calendarEvents
  });
};
