import expect from 'unexpected'
import jsdom from 'mocha-jsdom'

import * as date from '../src/date'
import * as builder from '../src/builder'

var _state = {
  date: new Date('April 6, 2015')
}

describe('builder', function () {
  jsdom()

  it('returns table row of day names', function () {
    let node = builder.dayNames()
    expect(node.querySelectorAll('th').length, 'to equal', 7)
  })

  it('returns a week', function () {
    let days = [1,2,3,4,5,6,7].map((day) => new Date(2016, 11, day))
    let node = builder.week(days)

    expect(node.querySelectorAll('.z-day').length, 'to equal', 7)
  })

  it('returns a month', function () {
    let node = builder.month(date.buildWeeks(_state.date))
    expect(node.length, 'to equal', 6)
  })

  it('returns the current month and year', function () {
    let node = builder.template(_state)
    expect(node.querySelector('.z-title').innerHTML, 'to equal', 'April 2015')
  })
})
