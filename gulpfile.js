var gulp = require('gulp')
  , clean = require('gulp-clean')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify');

gulp.task('dist-clean', function() {

  return gulp.src('./dist/')
    .pipe(clean());
});

gulp.task('js-change', ['dist-clean'], function() {

  gulp.src([
    './src/hb-auth.js',
    './src/services/**.js'
  ])
    .pipe(uglify())
    .pipe(concat('hb-auth.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['js-change']);