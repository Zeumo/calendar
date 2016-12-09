import domEvents from './domEvents'
import render from './render'

require('./style.scss')

var Calendar = function (el, options) {
  this.el = el

  this.options = Object.assign({
    onDayClick: () => {}
  }, options)

  this.currentDate = new Date()
  this.calendarEvents = {}

  this.events = Object.keys(domEvents).reduce((r, f) => {
    return Object.assign(r, { [f]: domEvents[f].bind(this) })
  }, {})
}

Object.assign(Calendar.prototype, {
  render
})

module.exports = Calendar
