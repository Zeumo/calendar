let classNames = require('../classNames').default
let weekSkeleton = require('./weekSkeleton.jsx')
let dayName = require('./dayName.jsx')
let eventsRow = require('./eventsRow.jsx')

module.exports = ({days, events}) => {
  return (
    <div className="week">
      {weekSkeleton(days)}

      <div className="overlay">
        <table className="events">
          <thead>
            <tr>
              {days.map(dayName)}
            </tr>
          </thead>
          <tbody>
            {events.map(eventsRow)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
