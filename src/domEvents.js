import { nextMonthDate, prevMonthDate, beginningOfDay } from './date'

export default {
  handleNextMonthClick(e) {
    e.preventDefault()
    var newDate = nextMonthDate(this.currentDate)
    this.render(newDate)
  },

  handlePrevMonthClick(e) {
    e.preventDefault()
    var newDate = prevMonthDate(this.currentDate)
    this.render(newDate)
  },

  handleTodayClick(e) {
    e.preventDefault()
    this.render(new Date())
  },

  handleDayClick(e, date) {
    this.options.onDayClick(e, new Date(beginningOfDay(date)))
  }
}
