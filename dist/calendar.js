var Calendar =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);
	var events = __webpack_require__(2);
	var render = __webpack_require__(5);

	var Calendar = function (el, options) {
	  this.el = el;

	  this.options = _.extend({
	    onDayClick: _.noop
	  }, options);

	  this.currentDate = new Date();
	  this.calendarEvents = {};

	  events._delegate.call(this);
	};

	_.extend(Calendar.prototype, events, {
	  render: render
	});

	module.exports = Calendar;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);
	var $ = __webpack_require__(3);
	var date = __webpack_require__(4);

	module.exports = {
	  events: {
	    'click .next': 'handleNextMonth',
	    'click .prev': 'handlePrevMonth',
	    'click .today': 'handleToday',
	    'click .day': 'handleDay'
	  },

	  _delegate: function () {
	    _.each(this.events, function (handler, k) {
	      var parts = k.split(' ');
	      var selector = parts[1],
	          eventType = parts[0];

	      $(this.el).on(eventType, selector, this[handler].bind(this));
	    }, this);
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

	  handleDay: function(e) {
	    this.options.onDayClick(new Date($(e.currentTarget).data('date')))
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = $;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var builder = __webpack_require__(6);

	var parseDates = function(events) {
	  return _.map(events, function(event) {
	    if (event.start_date instanceof Date) {
	      return event
	    } else {
	      return _.merge(event, {
	        start_date: new Date(event.start_date),
	        end_date: new Date(event.end_date)
	      });
	    }
	  });
	}

	module.exports = function (newDate, calendarEvents) {
	  this.currentDate = newDate || this.currentDate;
	  this.calendarEvents = parseDates(calendarEvents || this.calendarEvents);

	  this.el.innerHTML = builder.template({
	    date: this.currentDate,
	    events: this.calendarEvents
	  });
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);
	var date = __webpack_require__(4);
	var dom = __webpack_require__(7);

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
	    var eventTmpl = _.template(__webpack_require__(8), {
	      'imports': {
	        'date': date,
	        'today': _date
	      }
	    });
	    return _.map(eventsOnDate(_date), eventTmpl).join('');
	  },

	  day: function (day) {
	    var dayTmpl = _.template(__webpack_require__(9));
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
	    return dom.tr(_.map(days, this.day, this).join(''));
	  },

	  month: function (weeks) {
	    return _.map(weeks, this.week, this).join('');
	  },

	  template: function (state) {
	    _state = state;
	    var calendarTmpl = _.template(__webpack_require__(10));

	    return calendarTmpl({
	      monthName: date.getMonthName(_state.date),
	      year: _state.date.getFullYear(),
	      header: this.dayNames(),
	      weeks: this.month(date.buildWeeks(_state.date))
	    });
	  }
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	var _wrap = function (tag) {
	  return function (src) {
	    return '<' + tag + '>' + src + '</'+ tag + '>';
	  };
	};

	module.exports = {
	  th: _wrap('th'),
	  tr: _wrap('tr')
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=\"event\"><% if (url) { %><a href=\"<%= url %>\" class=\"event-title\"><% if (date.isSameDay(today, start_date)) { %><%= date.simpleTime(start_date) %>&nbsp;<% } %><%= title %></a><% } else { %><span class=\"event-title\"><% if (date.isSameDay(today, start_date)) { %><%= date.simpleTime(start_date) %>&nbsp;<% } %><%= title %></span><% } %></div>";

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<td class=\"<%= active %>\"><% if (day) { %><div class=\"day\" data-date=\"<%= date %>\"><span class=\"numeral\"><%= day %></span><div class=\"day-events\"><%= events %></div></div><% } %></td>";

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div id=\"zeumo-calender\"><div class=\"header\"><span class=\"title\"><%= monthName %> <%= year %></span><div class=\"actions\"><a href=\"#\" class=\"today\">Today</a><a href=\"#\" class=\"prev\">&larr;</a><a href=\"#\" class=\"next\">&rarr;</a></div></div><table><thead><%= header %></thead><tbody><%= weeks %></tbody></table></div>";

/***/ }
/******/ ]);