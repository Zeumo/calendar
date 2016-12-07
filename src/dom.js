var _wrap = (tag) => (src) => '<' + tag + '>' + src + '</'+ tag + '>'

export default {
  th: _wrap('th'),
  tr: _wrap('tr')
}
