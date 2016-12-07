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
    let node = builder.dayNames()
    expect(node.querySelectorAll('th').length, 'to equal', 7)
  })

  it('returns a day', function () {
    var day = builder.day(_state.date).outerHTML

    expect(day, 'to match', /day/)
    expect(day, 'to match', /class="numeral/)
    expect(day, 'to match', /6/)
  })

  it('returns a week', function () {
    let node = builder.week([1,2,3,4,5,6,7].map(function (day) {
      return new Date(2016, 11, day)
    }))

    expect(node.querySelectorAll('.day').length, 'to equal', 7)
  })

  it('returns a month', function () {
    let node = builder.month(date.buildWeeks(_state.date))
    expect(node.length, 'to equal', 6)
  })

  it('returns the current month and year', function () {
    let node = builder.template(_state)
    expect(node.querySelector('.title').innerHTML, 'to equal', 'April 2015')
  })
})
