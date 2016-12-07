module.exports = (props) => {
  let classNames = ['day', props.trailing && 'day-trailing'].filter(f => f).join(' ')

  return (
    <td className={props.active}>
      {props.day && (
        <div className={classNames} data-date={props.date}>
          <span className="numeral">{props.day}</span>
          <div className="day-events">
            {props.events}
          </div>
        </div>
      )}
    </td>
  )
}
