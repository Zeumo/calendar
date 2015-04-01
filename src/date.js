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

  buildWeeks: function (date) {
    var totalDays  = this.daysInMonth(date);
    var firstDay   = this.beginningOfMonth(date).getDay();

    var days = _(totalDays).times()
      .map(function (i) { return i + 1; })
      .value();

    _.times(firstDay, function () {
      days.unshift('');
    });

    return _.chunk(days, 7);
  }
};
