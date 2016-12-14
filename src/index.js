require('./style.scss')

import { assign } from 'lodash'
import domEvents from './domEvents'
import render from './render'

var Calendar = function (el, options) {
  this.el = el

  this.options = assign({
    onDayClick: () => {}
  }, options)

  this.currentDate = new Date()
  this.calendarEvents = {}

  this.events = Object.keys(domEvents).reduce((r, f) => {
    return assign(r, { [f]: domEvents[f].bind(this) })
  }, {})
}

assign(Calendar.prototype, {
  render
})

module.exports = Calendar
