const classNames = require('../classNames').default

module.exports = (date) => {
  let className = classNames('day', {
    'day-trailing': date.trailing,
    'active': date.active
  })

  return (
    <th className={className}>
      {date.day}
    </th>
  )
}
