var _ = require('lodash');
var date = require('./date');
var dom = require('./dom');

var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
    return dom.tr(DAY_NAMES.map(dom.th).join(''));
  },

  events: function (_date) {
    var eventTmpl = _.template(require('./templates/event.html'), {
      'imports': {
        'date': date,
        'today': _date
      }
    });
    return _.map(eventsOnDate(_date), eventTmpl).join('');
  },

  day: function (day) {
    var dayTmpl = _.template(require('./templates/day.html'));
    var isDay = day && typeof day === 'number';
    var newDate = new Date(_state.date);
    newDate.setDate(day);

    return dayTmpl({
      day: day,
      date: newDate,
      active: isDay && date.isToday(newDate) ? 'active' : '',
      events: this.events(newDate)
    });
  },

  week: function (days) {
    return dom.tr(days.map(this.day.bind(this)).join(''));
  },

  month: function (weeks) {
    return weeks.map(this.week.bind(this)).join('');
  },

  template: function (state) {
    _state = state;
    var calendarTmpl = _.template(require('./templates/calendar.html'));

    return calendarTmpl({
      monthName: date.getMonthName(_state.date),
      year: _state.date.getFullYear(),
      header: this.dayNames(),
      weeks: this.month(date.buildWeeks(_state.date))
    });
  }
};
