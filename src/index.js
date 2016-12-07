import _ from 'lodash'
import events from './events'
import render from './render'

require('./style.scss')

var Calendar = function (el, options) {
  this.el = el

  this.options = _.extend({
    onDayClick: _.noop
  }, options)

  this.currentDate = new Date()
  this.calendarEvents = {}

  events._delegate.call(this)
}

_.extend(Calendar.prototype, events, {
  render: render
})

module.exports = Calendar
