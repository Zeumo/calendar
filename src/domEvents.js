import * as date from './date'

export default {
  handleNextMonthClick(e) {
    e.preventDefault()
    var newDate = date.nextMonthDate(this.currentDate)
    this.render(newDate)
  },

  handlePrevMonthClick(e) {
    e.preventDefault()
    var newDate = date.prevMonthDate(this.currentDate)
    this.render(newDate)
  },

  handleTodayClick(e) {
    e.preventDefault()
    this.render(new Date())
  },

  handleDayClick(e, date) {
    this.options.onDayClick(new Date(date))
  }
}
