export default (...args) => {
  return args.reduce((result, condition) => {
    let classNames = condition

    if (typeof condition === 'object') {
      classNames = Object.keys(condition).map((className) => {
        if (condition[className]) return className
      }).filter(f => f)
    }
    return result.concat(classNames)
  }, []).join(' ')
}
