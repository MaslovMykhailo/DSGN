'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');


const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('less', () => {
  return gulp.src('./frontend/less/index.less')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(less())
    .pipe(gulpIf(!isDev, autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpIf(!isDev, cleanCSS({compatibility: 'ie10'})))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./public'));
});

gulp.task('js', () => {
  return gulp.src('./frontend/js/**/*.js')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(concat('index.js'))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./public'))
});

gulp.task('assets:html', () => {
  return gulp.src('./frontend/assets/**/*.html', { since: gulp.lastRun('assets:html') })
    .pipe(gulp.dest('./public'));
});

gulp.task('assets:pictures', () => {
  return gulp.src('./frontend/assets/**/*.{png,svg}', { since: gulp.lastRun('assets:pictures') })
    .pipe(gulpIf(!isDev, imagemin()))
    .pipe(gulp.dest('./public'));
});

gulp.task('clean', () => {
  return del('./public');
});

gulp.task('build', gulp.series(
  'clean', gulp.parallel('less', 'assets:html', 'assets:pictures', 'js'))
);

gulp.task('watch', () => {
  gulp.watch('./frontend/less/**/*.less', gulp.series('less'));
  gulp.watch('./frontend/js/**/*.js', gulp.series('js'));
  gulp.watch('./frontend/assets/**/*.html', gulp.series('assets:html'));
  gulp.watch('./frontend/assets/**/*.{png,svg}', gulp.series('assets:pictures'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: 'public'
  });
  
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

gulp.task('default', gulp.series('build'));