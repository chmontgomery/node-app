var gulp = require('gulp-help')(require('gulp')),
  gbundle = require('gulp-bundle-assets'),
  gutil = require('gulp-util'),
  del = require('del'),
  argv = require('yargs').argv,
  path = require('path'),
  spawn = require('child_process').spawn,
  publicPath = './public';

// do a clean and build when first starting up
gulp.task('dev', 'Watch and restart server on change', function (cb) {
  require('run-sequence')('build',
    ['nodemon', 'watch'],
    cb);
}, {
  options: {
    'debug': 'Start in debug mode'
  }
});

gulp.task('nodemon', false, function (cb) {
  var nodemon = require('gulp-nodemon');

  var nodemonOpts = {
    script: 'server.js',
    ext: 'dust js',

    ignore: [ // only watch server files
      'bower_components/*',
      'node_modules/*',
      'public/*',
      'src/public/*'
    ],
    stdout: false
  };
  if (argv.debug) {
    nodemonOpts.nodeArgs = ['--debug'];
  }
  nodemon(nodemonOpts)
    .on('restart', function () {
      var d = new Date();
      console.log(require('gulp-util').colors.bgBlue('server restarted at ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()));
    })
    .on('readable', function() {
      var bunyan = spawn('node', [path.join(__dirname, 'node_modules/bunyan/bin/bunyan')], { stdio: ['pipe', process.stdout, process.stderr] });
      this.stdout.pipe(bunyan.stdin);
      this.stderr.pipe(bunyan.stdin);
    });
  cb();
});

gulp.task('clean', 'Clean all assets out of /public', function (cb) {
  del([publicPath + '/*'], cb);
});

gulp.task('watch', 'Watch assets and build on change', function (cb) {
  var livereload = require('gulp-livereload');
  livereload.listen();
  gbundle.watch({
    configPath: path.join(__dirname, 'bundle.config.js'),
    results: {
      dest: __dirname,
      pathPrefix: '/public/'
    },
    dest: path.join(__dirname, publicPath)
  });
  gulp.watch(publicPath + '/**/*.*').on('change', function (file) {
    livereload(file);
    //console.log(gutil.colors.grey('Changed:', file));
    var d = new Date();
    console.log(gutil.colors.bgBlue('browser livereload at ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()));
  });
  cb();
});


function bundle() {
  return gulp.src('./bundle.config.js')
    .pipe(gbundle())
    .pipe(gbundle.results({
      dest: './',
      pathPrefix: '/public/'
    }))
    .pipe(gulp.dest(publicPath));
}

gulp.task('bundle', 'Builds all static files', function () {
  return bundle();
});

gulp.task('build', 'Cleans and builds all static files', ['clean'], function () {
  return bundle();
});
