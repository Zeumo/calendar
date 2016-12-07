import { extend, noop } from 'lodash'
import events from './events'
import render from './render'

require('./style.scss')

var Calendar = function (el, options) {
  this.el = el

  this.options = extend({
    onDayClick: noop
  }, options)

  this.currentDate = new Date()
  this.calendarEvents = {}

  events._delegate.call(this)
}

extend(Calendar.prototype, events, {
  render: render
})

module.exports = Calendar
