var _ = require('lodash');
var date = require('./date');
var dom = require('./dom');

var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var _state = {};

var eventsOnDate = function (_date) {
  var events = _.filter(_state.events, function (event) {
    if (date.isBetween(_date, event.start_date, event.end_date)) {
      return event;
    }
  }, []);

  return _.sortBy(events, 'start_date');
};

module.exports = {
  dayNames: function () {
    return dom.tr(DAYS.map(dom.th).join(''));
  },

  events: function (_date) {
    var eventTmpl = _.template(require('./templates/event.html'), {
      'imports': { 'simpleTime': date.simpleTime }
    });
    return _.map(eventsOnDate(_date), eventTmpl).join('');
  },

  week: function (days) {
    var dayTmpl = _.template(require('./templates/day.html'));

    return _.map(days, function (day) {
      var isDay = day && typeof day === 'number';
      var newDate = new Date(_state.date);
      newDate.setDate(day);

      return dayTmpl({
        day: day,
        active: isDay && date.isToday(newDate) ? 'active' : '',
        events: this.events(newDate)
      });
    }, this).join('');
  },

  month: function (weeks) {
    return _.map(weeks, function (week) {
      return dom.tr(this.week(week));
    }, this).join('');
  },

  template: function (state) {
    _state = state;

    var calendarTmpl = _.template(require('./templates/calendar.html'));
    var weeks = date.buildWeeks(_state.date);
    var year = _state.date.getFullYear();

    return calendarTmpl({
      title: [date.getMonthName(_state.date), year].join(' '),
      header: this.dayNames(),
      month: this.month(weeks)
    });
  }
};
