var _ = require('lodash');
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = {
  beginningOfMonth: function (date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  },

  endOfMonth: function (date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },

  daysInMonth: function(date) {
    return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
  },

  getMonthName: function (date) {
    return MONTHS[date.getMonth()];
  },

  simpleTime: function (date) {
    var str = [];
    var hr = date.getHours();
    var min = date.getMinutes();
    min = min && min < 10 ? '0' + min : min;

    var meridian = hr < 12 ? 'a' : 'p';
    hr = hr > 12 ? hr - 12 : hr === 0 ? 12 : hr;

    str.push(hr);
    min && str.push(':' + min);
    str.push(meridian);

    return str.join('');
  },

  isBetween: function (srcDate, startDate, endDate) {
    srcDate   = _.clone(srcDate).setHours(0,0,0,0);
    startDate = _.clone(startDate).setHours(0,0,0,0);
    endDate   = _.clone(endDate).setHours(0,0,0,0);

    return srcDate >= startDate && srcDate <= endDate;
  },

  isSameDay: function (srcDate, targetDate) {
    srcDate    = _.clone(srcDate);
    targetDate = _.clone(targetDate);
    srcDate.setHours(0,0,0,0);
    targetDate.setHours(0,0,0,0);

    return srcDate.getTime() === targetDate.getTime();
  },

  isToday: function (date) {
    return this.isSameDay(new Date(), date);
  },

  nextMonthDate: function (currentDate) {
    var date, currentMonth = currentDate.getMonth();

    if (currentMonth === 11) {
      date = new Date(currentDate.getFullYear() + 1, 0, 1);
    } else {
      date = new Date(currentDate.getFullYear(), currentMonth + 1, 1);
    }

    return date;
  },

  prevMonthDate: function (currentDate) {
    var date, currentMonth = currentDate.getMonth();

    if (currentMonth === 0) {
      date = new Date(currentDate.getFullYear() - 1, 11, 1);
    } else {
      date = new Date(currentDate.getFullYear(), currentMonth - 1, 1);
    }

    return date;
  },

  // [
  //   [01, 02, 03, 04, 05, 06, 07],
  //   [08, 09, 10, 11, 12, 13, 14],
  //   [15, 16, 17, 18, 19, 20, 21],
  //   [22, 23, 24, 25, 26, 27, 28],
  //   [29, 30, 31],
  // ]
  buildWeeks: function (date) {
    var totalDays = this.daysInMonth(date);

    // 0 = Sun, 1 = Mon, 2, Tues, ...
    var firstDay = this.beginningOfMonth(date).getDay();

    // [1, 2, 3, 4, 5, ... 31]
    var days = _(totalDays).times()
      .map(function (i) { return i + 1; })
      .value();

    // ['', '', 1, 2, 3, 4, 5, ... 31]
    _.times(firstDay, function () {
      days.unshift('');
    });

    return _.chunk(days, 7);
  }
};
