var _wrap = function (tag) {
  return function (src) {
    return '<' + tag + '>' + src + '</'+ tag + '>'
  }
}

export default {
  th: _wrap('th'),
  tr: _wrap('tr')
}
