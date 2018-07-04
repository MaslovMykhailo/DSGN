'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('less', () => {
  return gulp.src('./frontend/less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat('index.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public'));
});

gulp.task('assets', () => {
  return gulp.src('./frontend/assets/**/*.*', {since: gulp.lastRun('assets')})
    .pipe(gulp.dest('./public'));
});

gulp.task('clean', () => {
  return del('./public');
});

gulp.task('build', gulp.series(
  'clean', gulp.parallel('less', 'assets'))
);

gulp.task('watch', () => {
  gulp.watch('./frontend/less/**/*.less', gulp.series('less'));
  gulp.watch('./frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: 'public'
  });
  
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));