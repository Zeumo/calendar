const classNames = require('../classNames').default

module.exports = (event) => {
  if (event.spacer) {
    return <td colSpan={event.colSpan} />
  }

  let time = event.showStartTime ? [event.startTime, ' '] : null
  let className = classNames('z-event', {
    [`z-event-continues-${event.continues}`]: event.continues,
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
}
