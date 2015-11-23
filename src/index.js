var _ = require('lodash');
var events = require('./events');
var render = require('./render');

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
