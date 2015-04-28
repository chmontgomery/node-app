var transformHelper = require('gulp-bundle-assets').transformHelper,
  srcPath = './src/public';

module.exports = {
  bundle: {
    vendor: {
      scripts: [
        {
          src: './bower_components/jquery/dist/jquery.js',
          minSrc: './bower_components/jquery/dist/jquery.min.js'
        },
        {
          src: './bower_components/lodash/dist/lodash.js',
          minSrc: './bower_components/lodash/dist/lodash.min.js'
        }
      ],
      styles: [
        {
          src: './bower_components/bootstrap/dist/css/bootstrap.css',
          minSrc: './bower_components/bootstrap/dist/css/bootstrap.min.css'
        }
      ],
      options: {
        useMin: ['production'],
        rev: ['production'],
        watch: {
          scripts: false,
          styles: false
        }
      }
    },
    main: {
      scripts: srcPath + '/**/*.js',
      styles: srcPath + '/**/*.less',
      options: {
        uglify: ['production'],
        minCSS: ['production'],
        rev: ['production'],
        transforms: {
          styles: transformHelper.less()
        }
      }
    }
  },
  copy: [
    {
      src: [
          srcPath + '/images/**'
      ],
      base: srcPath
    },
    {
      src: './bower_components/bootstrap/dist/fonts/*',
      base: './bower_components/bootstrap/dist/',
      watch: false
    }
  ]
};
