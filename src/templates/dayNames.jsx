module.exports = (names) => {
  return (
    <tr>
      {names.map((name) => {
        return <th>{name}</th>
      })}
    </tr>
  )
}
