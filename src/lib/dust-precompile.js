var fs = require('fs'),
  path = require('path'),
  dust = require('./services/dust'),
  recursive = require('recursive-readdir');

module.exports = function(opts) {
  if (!opts.viewPath) throw new Error('Missing required field: viewPath');
  var viewPath = opts.viewPath;

  recursive(viewPath/*, ['!*.dust']*/, function (err, files) {
    if (err) return;
    files.forEach(function(file) {
      var ext = path.extname(file);
      if (ext !== '.dust') return;
      var localPath = file.replace(viewPath + '/', '').replace(ext, '');
      var compiled = dust.compile(fs.readFileSync(file, 'utf8'), localPath);
      //dust._templates[localPath] = compiled;
      dust.loadSource(compiled);
      console.log('dust precompile:', localPath)
    });
  });
};
