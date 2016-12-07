var expect = require('unexpected');
var date = require('../src/date');

var TODAY = new Date('April 6 2015');

describe('date', function () {
  it('returns the beginning of the month', function () {
    expect(date.beginningOfMonth(TODAY), 'to equal', new Date('April 1 2015'));
  });

  it('returns the end of the month', function () {
    expect(date.endOfMonth(TODAY), 'to equal', new Date('April 30 2015'));
  });

  it('returns days in a month', function () {
    var normalFebuary = new Date('Feb 1 2015');
    var leapYearFebuary = new Date('Feb 1 2016');
    expect(date.daysInMonth(TODAY), 'to equal', 30);
    expect(date.daysInMonth(normalFebuary), 'to equal', 28);
    expect(date.daysInMonth(leapYearFebuary), 'to equal', 29);
  });

  it('returns the month name', function () {
    expect(date.getMonthName(TODAY), 'to equal', 'April');
  });

  it('returns the simple time', function () {
    var _1_00pm = new Date('April 6 2015 13:00');
    var _1_00am = new Date('April 6 2015 1:00');
    var _3_45pm = new Date('April 6 2015 15:45');
    expect(date.simpleTime(_1_00pm), 'to equal', '1p');
    expect(date.simpleTime(_1_00am), 'to equal', '1a');
    expect(date.simpleTime(_3_45pm), 'to equal', '3:45p');
  });

  it('checks if a date in a range', function () {
    expect(date.isBetween(TODAY, new Date('April 5 2015'), new Date('April 7 2015')), 'to be true');
    expect(date.isBetween(TODAY, new Date('August 1 2015'), new Date('August 3 2015')), 'to be false');
  });

  it('checks if a date is the same day', function () {
    expect(date.isSameDay(TODAY, new Date('April 6 2015')), 'to be true');
    expect(date.isSameDay(TODAY, new Date('April 7 2015')), 'to be false');
  });

  it('finds the leading month', function () {
    expect(date.nextMonthDate(TODAY), 'to equal', new Date('May 1 2015'));
  });

  it('finds the trailing month', function () {
    expect(date.prevMonthDate(TODAY), 'to equal', new Date('March 1 2015'));
  });

  it('returns an array of weeks', function () {
    var marchWeeks = [
      [ 1, 2, 3, 4, 5, 6, 7 ],
      [ 8, 9, 10, 11, 12, 13, 14 ],
      [ 15, 16, 17, 18, 19, 20, 21 ],
      [ 22, 23, 24, 25, 26, 27, 28 ],
      [ 29, 30, 31, 1, 2, 3, 4 ],
      [ 5, 6, 7, 8, 9, 10, 11 ],
    ];
    var aprilWeeks = [
      [ 29, 30, 31, 1, 2, 3, 4 ],
      [ 5, 6, 7, 8, 9, 10, 11 ],
      [ 12, 13, 14, 15, 16, 17, 18 ],
      [ 19, 20, 21, 22, 23, 24, 25 ],
      [ 26, 27, 28, 29, 30, 1, 2 ],
      [ 3, 4, 5, 6, 7, 8, 9 ],
    ];

    var march = date.buildWeeks(new Date('March 1 2015'))
    expect(march[0][0], 'to equal', new Date('March 1 2015'));
    expect(march[5][6], 'to equal', new Date('April 11 2015'));

    var april = date.buildWeeks(new Date('April 1 2015'))
    expect(april[0][0], 'to equal', new Date('March 29 2015'));
    expect(april[5][6], 'to equal', new Date('May 9 2015'));
  });
});
