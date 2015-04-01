var _wrap = function (tag) {
  return function (src) {
    return '<' + tag + '>' + src + '</'+ tag + '>';
  };
};

module.exports = {
  th: _wrap('th'),
  tr: _wrap('tr')
};
