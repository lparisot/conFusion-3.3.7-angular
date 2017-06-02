var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del');

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('usemin', 'imagemin', 'copyfonts');
});

// checking JS code
gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// remove dist folder
gulp.task('clean', function() {
  return del(['dist/**']);
});

// minify CSS and uglify JS, need to check JS code before
gulp.task('usemin', ['jshint'], function () {
  return gulp.src('./app/menu.html')
    .pipe(usemin({
      js: [uglify(), rev()],
      css:[minifycss(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

// minify images
gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'));
    //.pipe(notify({ message: 'Images task complete' }));
});

// copy all fonts, need to clean dist folder before
gulp.task('copyfonts', ['clean'], function() {
   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
   gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('on-js-watch', ['usemin'], function(done) {
  browserSync.reload();
  done();
});
gulp.task('on-image-watch', ['imagemin'], function(done) {
  browserSync.reload();
  done();
});

// on any change in dist folder, reload page in browser
gulp.task('watch', ['default'], function () {
  browserSync.init({
    server: {
       baseDir: "dist",
       index: "menu.html"
    }
  });

  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['on-js-watch']);
  gulp.watch('app/images/**/*', ['on-image-watch']);
});
