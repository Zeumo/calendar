var date = require('../src/date');
var today = new Date('April 6 2015');

describe('date', function () {
  it('returns the beginning of the month', function () {
    expect(date.beginningOfMonth(today)).toEqual(new Date('April 1 2015'));
  });

  it('returns the end of the month', function () {
    expect(date.endOfMonth(today)).toEqual(new Date('April 30 2015'));
  });

  it('returns days in a month', function () {
    var normalFebuary = new Date('Feb 2015');
    var leapYearFebuary = new Date('Feb 2016');
    expect(date.daysInMonth(today)).toEqual(30);
    expect(date.daysInMonth(normalFebuary)).toEqual(28);
    expect(date.daysInMonth(leapYearFebuary)).toEqual(29);
  });

  it('returns the month name', function () {
    expect(date.getMonthName(today)).toEqual('April');
  });

  it('checks if a date in a range', function () {
    expect(date.isBetween(today, new Date('April 5 2015'), new Date('April 7 2015'))).toBe(true);
    expect(date.isBetween(today, new Date('August 1 2015'), new Date('August 3 2015'))).toBe(false);
  });

  it('checks if a date is the same day', function () {
    expect(date.isSameDay(today, new Date('April 6 2015'))).toBe(true);
    expect(date.isSameDay(today, new Date('April 7 2015'))).toBe(false);
  });

  it('finds the leading month', function () {
    expect(date.nextMonthDate(today)).toEqual(new Date('May 2015'));
  });

  it('finds the trailing month', function () {
    expect(date.prevMonthDate(today)).toEqual(new Date('March 2015'));
  });

  it('returns an array of weeks', function () {
    var marchWeeks = [
      [01, 02, 03, 04, 05, 06, 07],
      [08, 09, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31],
    ];
    var aprilWeeks = [
      [ '', '', '', 1, 2, 3, 4 ],
      [ 5, 6, 7, 8, 9, 10, 11 ],
      [ 12, 13, 14, 15, 16, 17, 18 ],
      [ 19, 20, 21, 22, 23, 24, 25 ],
      [ 26, 27, 28, 29, 30 ]
    ];
    expect(date.buildWeeks(new Date('March 2015'))).toEqual(marchWeeks);
    expect(date.buildWeeks(today)).toEqual(aprilWeeks);
  });
});
