var path = require('path');

module.exports = function (contents) {
  this.cacheable && this.cacheable();
  var filename = path.basename(this.resource);
  var name     = filename.replace(/\.html$/, '');
  contents = contents.toString()
    .replace(/\"/g, '\\"')
    .replace(/\n\s*/g, '');

  return 'module.exports = "' + contents + '";';
};
