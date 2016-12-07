let classNames = require('../classNames').default

module.exports = (props) => {
  return (
    <td className={props.active}>
      {props.day && (
        <div className={classNames('day', { 'day-trailing': props.trailing })} data-date={props.date}>
          <span className="numeral">{props.day}</span>
          <div className="day-events">
            {props.events}
          </div>
        </div>
      )}
    </td>
  )
}
