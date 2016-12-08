import $ from 'jquery'
import * as date from './date'

export default {
  events: {
    'click .next': 'handleNextMonth',
    'click .prev': 'handlePrevMonth',
    'click .today': 'handleToday',
    'click .day': 'handleDay'
  },

  _delegate() {
    Object.keys(this.events).forEach((key, i) => {
      let handler = this.events[key]
      let [eventType, selector] = key.split(' ')

      $(this.el).on(eventType, selector, this[handler].bind(this))
    })
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
    this.options.onDayClick(e, new Date(e.currentTarget.dataset.date))
  }
}
