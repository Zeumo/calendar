import expect from 'unexpected'
import * as date from '../src/date'

var TODAY = new Date('April 6, 2015 10:00')
var TOMORROW = new Date('April 7, 2015 10:00')

describe('date', function () {
  it('returns the start of the month', function () {
    expect(date.startOfMonth(TODAY), 'to equal', new Date('April 1 2015'))
  })

  it('returns the end of the month', function () {
    expect(date.endOfMonth(TODAY), 'to equal', new Date('April 30 2015'))
  })

  it('returns start of week', () => {
    expect(date.startOfWeek(TODAY), 'to equal', +(new Date('April 5 2015 00:00:00')))
  })

  it('returns end of week', () => {
    expect(date.endOfWeek(TODAY), 'to equal', +(new Date('April 11 2015 23:59:59.999')))
  })

  it('returns start of day', () => {
    expect(date.startOfDay(TODAY), 'to equal', +(new Date('April 6 2015 00:00:00')))
  })

  it('returns end of day', () => {
    expect(date.endOfDay(TODAY), 'to equal', +(new Date('April 6 2015 23:59:59.999')))
  })

  it('returns days in a month', function () {
    var normalFebuary = new Date('Feb 1 2015')
    var leapYearFebuary = new Date('Feb 1 2016')
    expect(date.daysInMonth(TODAY), 'to equal', 30)
    expect(date.daysInMonth(normalFebuary), 'to equal', 28)
    expect(date.daysInMonth(leapYearFebuary), 'to equal', 29)
  })

  it('returns the month name', function () {
    expect(date.getMonthName(TODAY), 'to equal', 'April')
  })

  it('returns the simple time', function () {
    var _1_00pm = new Date('April 6 2015 13:00')
    var _1_00am = new Date('April 6 2015 1:00')
    var _3_45pm = new Date('April 6 2015 15:45')
    expect(date.formatCondensedTime(_1_00pm), 'to equal', '1p')
    expect(date.formatCondensedTime(_1_00am), 'to equal', '1a')
    expect(date.formatCondensedTime(_3_45pm), 'to equal', '3:45p')
  })

  it('checks if a date in a range', function () {
    expect(date.isBetween(TODAY, new Date('April 5 2015'), new Date('April 7 2015')), 'to be true')
    expect(date.isBetween(TODAY, new Date('April 5 2015'), new Date('April 6 2015')), 'to be true')
    expect(date.isBetween(TODAY, new Date('August 1 2015'), new Date('August 3 2015')), 'to be false')
  })

  it('checks if date is before another date', () => {
    expect(date.isBefore(TODAY, TOMORROW), 'to be true')
  })

  it('checks if date is after another date', () => {
    expect(date.isAfter(TODAY, TOMORROW), 'to be false')
  })

  it('checks if a date is the same day', function () {
    expect(date.isSameDay(TODAY, new Date('April 6 2015')), 'to be true')
    expect(date.isSameDay(TODAY, new Date('April 7 2015')), 'to be false')
  })

  it('finds the leading month', function () {
    expect(date.addMonths(TODAY, 1), 'to equal', new Date('May 1 2015'))
  })

  it('finds the trailing month', function () {
    expect(date.subMonths(TODAY, 1), 'to equal', new Date('March 1 2015'))
  })

  it('returns an array of weeks', function () {
    var march = date.buildWeeks(new Date('March 1 2015'))
    expect(march[0][0], 'to equal', new Date('March 1 2015'))
    expect(march[5][6], 'to equal', new Date('April 11 2015'))

    var april = date.buildWeeks(new Date('April 1 2015'))
    expect(april[0][0], 'to equal', new Date('March 29 2015'))
    expect(april[5][6], 'to equal', new Date('May 9 2015'))
  })
})
