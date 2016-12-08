import expect from 'unexpected'
import { beginningOfWeek } from '../src/date'
import * as eventsUtil from '../src/events'

const ONE_DAY = 1000 * 60 * 60 * 24

const offsetDate = (date, days) => new Date(Date.parse(date) + ONE_DAY * days)

const makeEvent = (start, days = 0) => ({
  start_date: start,
  end_date: offsetDate(start, days)
})

const LAST_FRIDAY = new Date('Dec 2, 2016')
const TODAY = new Date('Dec 5, 2016')
const NEXT_MONDAY = new Date('Dec 12, 2016')

let eventsData = [
  makeEvent(LAST_FRIDAY, 2),
  makeEvent(TODAY, 2),
  makeEvent(offsetDate(TODAY, 2), 1),
  makeEvent(offsetDate(TODAY, 3), 1),
  makeEvent(offsetDate(TODAY, 4), 5),
  makeEvent(NEXT_MONDAY, 4),
]

describe('events', () => {
  it('finds non-overlapping events', () => {
    let events = eventsUtil.findNonOverlappingEvents(eventsData)

    expect(events[0], 'to equal', eventsData[0])
    expect(events[1], 'to equal', eventsData[1])
  })

  it('groups non-overlapping events', () => {
    let groups = eventsUtil.groupNonOverlappingEvents(eventsData)

    expect(groups, 'to have length', 2)
    expect(groups[0], 'to have length', 4)
    expect(groups[1], 'to have length', 2)
  })

  it('finds events occuring this week', () => {
    let events = eventsUtil.eventsOnWeek(TODAY, eventsData)
    expect(events, 'to have length', 5)
  })

  it('finds the distance for event starting same week', () => {
    let event = makeEvent(new Date('Dec 8 2016'), 10)
    let weekStart = beginningOfWeek('Dec 4 2016')

    expect(eventsUtil.getDistanceToEndOfWeek(weekStart, event), 'to equal', 3)
  })

  it('finds the distance for event spanning entire week', () => {
    let event = makeEvent(new Date('Nov 27 2016'), 14)
    let weekStart = beginningOfWeek('Dec 4 2016')

    expect(eventsUtil.getDistanceToEndOfWeek(weekStart, event), 'to equal', 7)
  })

  it('finds the distance for event ending same week', () => {
    let event = makeEvent(new Date('Nov 27 2016'), 10)
    let weekStart = beginningOfWeek('Dec 4 2016')

    expect(eventsUtil.getDistanceToEndOfWeek(weekStart, event), 'to equal', 4)
  })

  it('decorates event with extra details', () => {
    let event = makeEvent(new Date('Nov 27 2016 10:00'), 10)
    let weekStart = beginningOfWeek('Dec 4 2016')

    expect(eventsUtil.decorateEvent(weekStart, event), 'to satisfy', {
      startDay: 0,
      distance: 4,
      continues: 'before',
      time: '10a'
    })
  })
})
