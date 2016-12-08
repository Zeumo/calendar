module.exports = (props) => {
  return (
    <div id="z-calender">
      <div className="z-header">
        <span className="z-title">{props.monthName}{' '}{props.year}</span>
        <div className="z-actions">
          <a href="#" className="today" onClick={props.handleTodayClick}>Today</a>
          <a href="#" className="prev" onClick={props.handlePrevMonthClick}>&larr;</a>
          <a href="#" className="next" onClick={props.handleNextMonthClick}>&rarr;</a>
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
