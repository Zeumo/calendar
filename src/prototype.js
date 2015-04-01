var _ = require('lodash');
var builder = require('./builder');
var date = require('./date');

module.exports = {
  events: {
    'click .next': 'handleNextMonth',
    'click .prev': 'handlePrevMonth',
    'click .today': 'handleToday'
  },

  handleNextMonth: function (e) {
    e.preventDefault();
    var newDate = date.nextMonthDate(this.currentDate);
    this.render(newDate);
  },

  handlePrevMonth: function (e) {
    e.preventDefault();
    var newDate = date.prevMonthDate(this.currentDate);
    this.render(newDate);
  },

  handleToday: function (e) {
    e.preventDefault();
    this.render(new Date());
  },

  render: function (newDate, calendarEvents) {
    this.currentDate = newDate || this.currentDate;
    this.calendarEvents = calendarEvents || this.calendarEvents;

    var htmlStr = builder.template({
      date: this.currentDate,
      events: this.calendarEvents
    });

    this.el.innerHTML = htmlStr;
  }
};
