var fs = require('fs')
var nativejsx = require('nativejsx')

require.extensions['.jsx'] = function(module, filename) {
  var contents = nativejsx.parseSync(filename, {
    prototypes: 'inline'
  })
  return module._compile(contents, filename)
}
