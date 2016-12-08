module.exports = (props) => {
  return (
    <div id="z-calender">
      <div className="z-header">
        <span className="z-title">{props.monthName}{' '}{props.year}</span>
        <div className="z-actions">
          <a href="#" className="today">Today</a>
          <a href="#" className="prev">&larr;</a>
          <a href="#" className="next">&rarr;</a>
        </div>
      </div>
      <div class="z-container">
        <div class="z-day-names">
          <table>
            <thead>{props.header}</thead>
          </table>
        </div>
        <div class="z-weeks">
          {props.weeks}
        </div>
      </div>
    </div>
  )
}
