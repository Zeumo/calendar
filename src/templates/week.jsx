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
                  {row.map((el) => {
                    if (el.spacer) return <td colSpan={el.colSpan} />

                    let time = /right/.test(el.continues) ? `${el.time} ` : ''

                    return (
                      <td colSpan={el.distance} title={el.title}>
                        <div className={classNames('event', {
                          [`event-continues-${el.continues}`]: el.continues,
                        })}>
                          {el.url ? (
                            <a href={el.url}>{time}{el.title}</a>
                          ) : (
                            time + el.title
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
