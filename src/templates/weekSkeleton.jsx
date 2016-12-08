const classNames = require('../classNames').default

module.exports = (days) => {
  return (
    <table className="z-week-skeleton">
      <tbody>
        <tr>
          {days.map((date) => {
            return (
              <td
                className={classNames('z-day', { 'z-active': date.active})}
                onClick={(e) => date.handleDayClick(e, date.date)} />
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}
