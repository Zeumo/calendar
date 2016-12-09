import { forEach } from 'lodash'
import classNames from './classNames'
import { nextMonthDate, prevMonthDate, beginningOfDay } from './date'

const toggleClass = (el, className) => {
  let classList = el.className.split(' ')
  let index = classList.indexOf(className)
  let includesClassName = index > -1

  if (includesClassName) {
    classList.splice(index)
  }

  let nextClassNames = classNames.apply(null, classList.concat({
    [className]: !includesClassName
  }))

  forEach(document.querySelectorAll('.' + classList[0]), (node) => {
    node.className = nextClassNames
  })
}

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
  },

  handleEventMouseEnter(e) {
    toggleClass(e.currentTarget, 'z-event-hover')
  },

  handleEventMouseLeave(e) {
    toggleClass(e.currentTarget, 'z-event-hover')
  }
}
