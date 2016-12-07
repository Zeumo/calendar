import _ from 'lodash'
import $ from 'jquery'
import date from './date'

export default {
  events: {
    'click .next': 'handleNextMonth',
    'click .prev': 'handlePrevMonth',
    'click .today': 'handleToday',
    'click .day': 'handleDay'
  },

  _delegate() {
    _.forEach(this.events, function (handler, k) {
      var parts = k.split(' ')
      var selector = parts[1],
        eventType = parts[0]

      $(this.el).on(eventType, selector, this[handler].bind(this))
    }.bind(this))
  },

  handleNextMonth(e) {
    e.preventDefault()
    var newDate = date.nextMonthDate(this.currentDate)
    this.render(newDate)
  },

  handlePrevMonth(e) {
    e.preventDefault()
    var newDate = date.prevMonthDate(this.currentDate)
    this.render(newDate)
  },

  handleToday(e) {
    e.preventDefault()
    this.render(new Date())
  },

  handleDay(e) {
    this.options.onDayClick(e, new Date($(e.currentTarget).data('date')))
  }
}
