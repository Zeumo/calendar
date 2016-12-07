// [
//   {
//     id,
//     title,
//     start_date,
//     end_date,
//
//     props: {
//       distance,
//       startDay,
//       colspan = 7 - startDay,
//       remaining = distance - colspan,
//     }
//   }
// ]
//
// get the events that end this week
// get the events that start this week
//
// td
//   rowspan = (week events - today events)
//
// get non overlapping events

let events = [1,2,3,4,5,6].map((id) => {
  return {
    id: id,
    title: 'Event ' + id,
    startDate: new Date(2016, 11, id),
    endDate: new Date(2016, 11, id + 3),
  }
})

let isOverlapping = (collection, item) => {
  return !collection.every((e) => {
    return item.startDate > e.endDate
  })
}

let findNonOverlappingEvents = (collection, srcCollection) => {
  return srcCollection.reduce((result, event) => {
    if (isOverlapping(result, event)) return result
    return result.concat(event)
  }, collection)
}

let trEvents = events.reduce((r, event) => {
  return r.concat([
    findNonOverlappingEvents([event], events)
      .sort((a, b) => a.startDate > b.startDate)
  ])
}, [])

let rows = trEvents.map(row => {
  return (
    {
      tr: [
        {
          tag: 'td',
          rowspan: row.length,
          events: row
        }
      ]
    }
  )
})

console.log(JSON.stringify(rows, null, 2));
