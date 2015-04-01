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

  isSameDay: function (srcDate, targetDate) {
    return srcDate.getFullYear() === targetDate.getFullYear() &&
            srcDate.getDate() === targetDate.getDate() &&
            srcDate.getMonth() === targetDate.getMonth();
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
