const event = require('./event.jsx')

module.exports = (row) => {
  return (
    <tr>
      {row.map(event)}
    </tr>
  )
}
