var _ = require('lodash');
var delegateEvents = require('./delegateEvents');
var methods = require('./prototype');

var Calendar = function (el, options) {
  this.el = el;

  this.options = _.extend({
    titleAttr: 'title',
    dateAttr: 'date'
  }, options);

  this.currentDate = new Date();
  this.calendarEvents = {};

  delegateEvents.call(this, this.events);
};

_.extend(Calendar.prototype, methods);

module.exports = Calendar;
