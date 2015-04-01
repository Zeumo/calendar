var _ = require('lodash');
var date = require('./date');
var t = require('./t');
var calendarTmpl = require('./templates/calendar.html');

var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var _state = {};

module.exports = {
  dayNames: function () {
    var cells = DAYS.map(function (day) {
      return '<th>' + day + '</th>';
    }).join('');

    return (
      '<tr>' + cells + '</tr>'
    );
  },

  eventsOnDate: function (_date) {
    return _.filter(_state.events, function (event) {
      if (date.isBetween(_date, event.start_date, event.end_date)) return event;
    }, []);
  },

  events: function (_date) {
    var eventTmpl = require('./templates/event.html');
    var htmlStr = _.map(this.eventsOnDate(_date), function (event) {
      return t(eventTmpl, event);
    });
    return htmlStr.join('');
  },

  week: function (days) {
    var dayTmpl = require('./templates/day.html');

    return _.map(days, function (day) {
      var isDay = day && typeof day === 'number';
      var newDate = new Date(_state.date);
      newDate.setDate(day);

      return t(dayTmpl, {
        day: isDay && day,
        active: isDay && date.isToday(newDate) ? 'active' : '',
        events: isDay && this.events(newDate),
        className: isDay ? 'day' : ''
      });
    }, this).join('');
  },

  month: function (weeks) {
    return _.map(weeks, function (week) {
      return '<tr>' + this.week(week) + '</tr>';
    }, this).join('');
  },

  template: function (state) {
    _state = state;

    var weeks = date.buildWeeks(_state.date);
    var monthName = MONTHS[_state.date.getMonth()];
    var year = _state.date.getFullYear();

    return t(calendarTmpl, {
      title: [monthName, year].join(' '),
      header: this.dayNames(),
      month: this.month(weeks)
    });
  }
};
