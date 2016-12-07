import expect from 'unexpected'
import jsdom from 'mocha-jsdom'

import date from '../src/date'
import builder from '../src/builder'

var _state = {
  date: new Date('April 6, 2015')
}

describe('builder', function () {
  jsdom()

  it('returns table row of day names', function () {
    var el = document.createElement('table')
    el.innerHTML = builder.dayNames()

    expect(el.querySelectorAll('tr').length, 'to equal', 1)
    expect(el.querySelectorAll('th').length, 'to equal', 7)
  })

  it('returns a day', function () {
    var day = builder.day(_state.date)
    expect(day, 'to match', /class="day/)
    expect(day, 'to match', /class="numeral/)
    expect(day, 'to match', /6/)
  })

  it('returns a week', function () {
    var el = document.createElement('table')
    el.innerHTML = builder.week([1,2,3,4,5,6,7].map(function (day) {
      return new Date(2016, 12, day)
    }))
    expect(el.querySelectorAll('.day').length, 'to equal', 7)
  })

  it('returns a month', function () {
    var el = document.createElement('table')
    el.innerHTML = builder.month(date.buildWeeks(_state.date))
    expect(el.querySelectorAll('tr').length, 'to equal', 6)
  })

  it('returns the current month and year', function () {
    var el = document.createElement('div')
    el.innerHTML = builder.template(_state)
    expect(el.querySelector('.title').innerHTML, 'to equal', 'April 2015')
  })
})
