import { extend, noop } from 'lodash'
import domEvents from './domEvents'
import render from './render'

if (process.env.NODE_ENV !== 'production') {
  require('./style.scss')
}

var Calendar = function (el, options) {
  this.el = el

  this.options = extend({
    onDayClick: noop
  }, options)

  this.currentDate = new Date()
  this.calendarEvents = {}

  this.events = Object.keys(domEvents).reduce((r, f) => {
    return Object.assign(r, { [f]: domEvents[f].bind(this) })
  }, {})
}

extend(Calendar.prototype, {
  render
})

module.exports = Calendar
