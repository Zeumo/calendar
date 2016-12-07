let classNames = require('../classNames').default

module.exports = (days) => {
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
        <table>
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
            <tr>
              {days.map((date) => {
                return (
                  <td className={classNames({ 'active': date.active})} data-date={date.date}>
                    <div className="events">
                      {date.events}
                    </div>
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
