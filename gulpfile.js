/* file: gulpfile.js */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    express = require('express'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    jade = require('gulp-jade');


// Server and live reload ==========================

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(4000, '0.0.0.0');
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}


// Task templates jade =============================

gulp.task('html', function() {
    return gulp.src('views/*.jade')
        .pipe(jade({
             pretty: true
        })) // pip to jade plugin
        .pipe(gulp.dest('public/')); // tell gulp our output folder
});


// SASS and Minify ==================================

var onError = function (err) {  
  gutil.beep();
  console.log(err);
};

 
gulp.task('styles', function() {
  return gulp.src('source/scss/**/*.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())  // Process the original sources
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(autoprefixer(
        {
            browsers: [
                '> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
            ],
            cascade: false
        }
    ))
    .pipe(gulp.dest('./public/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/styles/'));
});



// Javascript concat and uglify ============================= 

gulp.task('build-js', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/javascript'));
});

//  Images Taks optimization ================================

gulp.task('images', function(){
  return gulp.src('source/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('public/images'))
});


// Watch task ==================================================

gulp.task('watch', function() {
  gulp.watch('source/scss/*.scss', ['styles']);
  gulp.watch('source/javascript/**/*.js', ['build-js']);
  gulp.watch('./views/**/*.jade', ['html']);
  gulp.watch('./public/*.html', notifyLiveReload);
  gulp.watch('./views/**/*.jade',  notifyLiveReload);
  gulp.watch('./public/styles/*.css', notifyLiveReload);
});

gulp.task('default', ['html', 'styles', 'express', 'build-js', 'livereload', 'watch'], function() {

});