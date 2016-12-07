module.exports = (props) => {
  return (
    <div id="zeumo-calender">
      <div className="header">
        <span className="title">{props.monthName}{' '}{props.year}</span>
        <div className="actions">
          <a href="#" className="today">Today</a>
          <a href="#" className="prev">&larr;</a>
          <a href="#" className="next">&rarr;</a>
        </div>
      </div>
      <table>
        <thead>{props.header}</thead>
        <tbody>{props.weeks}</tbody>
      </table>
    </div>
  )
}
