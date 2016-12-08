const classNames = require('../classNames').default

module.exports = (days) => {
  return (
    <div className="z-week-skeleton">
      <table>
        <tbody>
          <tr>
            {days.map((date) => {
              return (
                <td className={classNames({ 'z-active': date.active})} data-date={date.date}></td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
