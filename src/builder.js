var _ = require('lodash')
var date = require('./date')
var dom = require('./dom')

var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
var _state = {}

var eventsOnDate = function (_date) {
  var events = _.filter(_state.events, function (event) {
    if (date.isBetween(_date, event.start_date, event.end_date)) {
      return event
    }
  }, [])

  return _.sortBy(events, 'start_date')
}

var eventsOnWeek = function (startDate, endDate) {
  return _state.events.filter(function (event) {
    return date.isBetween(event.start_date, startDate, endDate);
  }).sort(function (a, b) {
    return a.start_date - b.start_date;
  });
}

module.exports = {
  dayNames: function () {
    return dom.tr(DAY_NAMES.map(dom.th).join(''))
  },

  events: function (_date) {
    var eventTmpl = _.template(require('./templates/event.html'), {
      'imports': {
        'date': date,
        'today': _date
      }
    })
    return _.map(eventsOnDate(_date), eventTmpl).join('')
  },

  day: function (_date) {
    var dayTmpl = _.template(require('./templates/day.html'))

    return dayTmpl({
      day: _date.getDate(),
      date: _date,
      active: date.isToday(_date) ? 'active' : '',
      trailing: date.isAdjacentMonth(_state.date, _date),
      events: this.events(_date)
    })
  },

  week: function (days) {
    var tmpl = _.template(require('./templates/week.html'));
    let events = eventsOnWeek(days[0], days[6])
      .sort((a, b) => new Date(a.start_date) > new Date(b.start_date))

    let isOverlapping = (collection, item) => {
      return !collection.every((e) => {
        return new Date(item.start_date) > new Date(e.end_date)
      })
    }

    let findNonOverlappingEvents = (collection, srcCollection) => {
      return srcCollection.reduce((result, event) => {
        if (isOverlapping(result, event)) return result
        return result.concat(event).sort((a, b) => new Date(a.start_date) > new Date(b.start_date))
      }, collection)
    }

    let rowEvents = events.reduce((r, event) => {
      let _events = findNonOverlappingEvents([event], events)

      _events = _events.map((e) => {
        let distance = date.daysBetween(e.start_date, e.end_date)
        let startDay = new Date(e.start_date).getDay()
        let colspan = startDay + distance > 7 ? (distance + startDay) % 7 : distance

        return Object.assign({}, e, {
          props: {
            distance: distance,
            startDay: startDay,
            colspan: colspan,
            remaining: distance - colspan,
          },
        })
      })

      return r.concat([_events])
    }, [])


    let rowSpan = 0
    let rows = rowEvents.map((row, rowI) => {
      let prevEventOffset = 0

      return row.reduce((result, event, i) => {
        let pad = {
          rowspan: rowEvents.length - rowI,
          colspan: event.props.startDay - prevEventOffset - rowSpan,
        }

        if (pad.colspan > 0) {
          result = result.concat([pad].concat(event))
          rowSpan = pad.rowspan
          prevEventOffset = event.props.startDay + event.props.distance
        } else {
          result = result.concat(event)
        }

        return result
      }, [])
    })

    console.log(rows);

    return tmpl({
      days: days.map(function (_date) {
        return {
          day: _date.getDate(),
          date: _date,
          active: date.isToday(_date) ? 'active' : '',
          trailing: date.isAdjacentMonth(_state.date, _date)
        }
      }),

      rows: rows
    });
  },

  month: function (weeks) {
    return weeks.map(this.week.bind(this)).join('')
  },

  template: function (state) {
    _state = state
    var calendarTmpl = _.template(require('./templates/calendar.html'))

    return calendarTmpl({
      monthName: date.getMonthName(_state.date),
      year: _state.date.getFullYear(),
      header: this.dayNames(),
      weeks: this.month(date.buildWeeks(_state.date))
    })
  }
}
