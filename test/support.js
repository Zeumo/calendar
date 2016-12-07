var fs = require('fs')

require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}
