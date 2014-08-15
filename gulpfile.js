var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    ignore = require('gulp-ignore'),
    ttf2eot = require('gulp-ttf2eot'),
    ttf2woff = require('gulp-ttf2woff'),
    jade = require('gulp-jade'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    marked = require('marked'),
    browserify = require('gulp-browserify');

// Styles
gulp.task('styles', ['templates'], function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('dev-styles', ['templates'], function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(browserify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true, svgoPlugins: [{removeViewBox: false}] })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Fonts
gulp.task('ttf2eot', function() {
  return gulp.src('src/fonts/*.ttf')
    .pipe(ttf2eot())
    .pipe(gulp.dest('dist/assets/fonts'))
});

gulp.task('ttf2woff', function() {
  return gulp.src('src/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest('dist/assets/fonts'))
});

gulp.task('ttf', function() {
  return gulp.src('src/fonts/*.ttf')
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('fonts', ['ttf2woff','ttf2eot','ttf'], function() {
  return gulp.src('dist/assets/fonts/')
    .pipe(notify({ message: 'Fonts task complete' }));
});

// Templates
gulp.task('templates', ['images'], function() {
  gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Templates task complete' }));
});

// Extras
gulp.task('extras', function() {
  gulp.src('src/extras/*')
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Extras task complete' }));
});

// Cleanup
gulp.task('clean', function() {
  return gulp.src(['dist/*'], {read: false})
    .pipe(rimraf());
});

// Server
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// Watch
gulp.task('watch', function() {
  // watch scss files
  gulp.watch('src/styles/**/*.scss', ['dev-styles']);
  // watch javascript files
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  // watch image files
  gulp.watch('src/images/**/*', ['templates']); // reactivates templates because of inline svg
  // watch font files
  gulp.watch('src/fonts/**/*', ['fonts']);
  // watch template files
  gulp.watch('src/**/*.jade', ['templates']);

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', function(file) {
    connect.reload();
  });

  // Open the browser to the site's local url 
  var options = {
    url: "http://localhost:8080"
  };
  
  gulp.src("./dist/index.html")
    .pipe(open("", options));
});

// Serve
gulp.task('serve', ['connect','watch']);

// Defualt task
gulp.task('default', ['clean'], function() {
  gulp.start('templates', 'styles','extras','scripts','images','fonts');
});
