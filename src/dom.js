var _ = require('lodash');

var _element = function (tag) {
  return _.wrap(_.identity, function (fn, src) {
    return '<' + tag + '>' + fn(src) + '</'+ tag + '>';
  });
};

module.exports = {
  th: _element('th'),
  tr: _element('tr')
};
