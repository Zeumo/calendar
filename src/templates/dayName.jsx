const classNames = require('../classNames').default

module.exports = (date) => {
  let className = classNames('z-day', {
    'z-day-trailing': date.trailing,
    'z-active': date.active
  })

  return (
    <th className={className}>
      {date.day}
    </th>
  )
}
