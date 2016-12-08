let classNames = require('../classNames').default

module.exports = ({days, events}) => {
  return (
    <div className="week">
      <div className="week-skeleton">
        <table>
          <tbody>
            <tr>
              {days.map((date) => {
                return (
                  <td className={classNames({ 'active': date.active})} data-date={date.date}></td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overlay">
        <table className="events">
          <thead>
            <tr>
              {days.map((date) => {
                return (
                  <th className={classNames('day', { 'day-trailing': date.trailing, 'active': date.active})}>
                    {date.day}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {events.map((row, rowIndex) => {
              return (
                <tr>
                  {row.map((event) => {
                    if (event.spacer) return <td colSpan={event.colSpan} />

                    let time = event.showStartTime ? [event.startTime, ' '] : null
                    let className = classNames('event', {
                      [`event-continues-${event.continues}`]: event.continues,
                    })

                    return (
                      <td colSpan={event.distance} title={event.title}>
                        <div className={className}>
                          {event.url ? (
                            <a href={event.url}>{time}{event.title}</a>
                          ) : (
                            <span>
                              {time}{event.title}
                            </span>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
