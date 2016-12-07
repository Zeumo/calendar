const date = require('../date').default

module.exports = (props) => {
  let time = date.isSameDay(props.today, props.start_date)
    ? [date.simpleTime(props.start_date), ' ' ]
    : null

  return (
    <div className="event">
      {props.url ? (
        <a href={props.url} className="event-title">
          {time}
          {props.title}
        </a>
      ) : (
        <span className="event-title">
          {time}
          {props.title}
        </span>
      )}
    </div>
  )
}
