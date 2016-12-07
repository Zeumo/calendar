var _ = require('lodash')
var $ = require('jquery')
var date = require('./date')

module.exports = {
  events: {
    'click .next': 'handleNextMonth',
    'click .prev': 'handlePrevMonth',
    'click .today': 'handleToday',
    'click .day': 'handleDay'
  },

  _delegate: function () {
    _.forEach(this.events, function (handler, k) {
      var parts = k.split(' ')
      var selector = parts[1],
        eventType = parts[0]

      $(this.el).on(eventType, selector, this[handler].bind(this))
    }.bind(this))
  },

  handleNextMonth: function (e) {
    e.preventDefault()
    var newDate = date.nextMonthDate(this.currentDate)
    this.render(newDate)
  },

  handlePrevMonth: function (e) {
    e.preventDefault()
    var newDate = date.prevMonthDate(this.currentDate)
    this.render(newDate)
  },

  handleToday: function (e) {
    e.preventDefault()
    this.render(new Date())
  },

  handleDay: function(e) {
    this.options.onDayClick(e, new Date($(e.currentTarget).data('date')))
  }
}
