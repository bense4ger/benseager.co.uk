"use strict";
const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sassPath = './scss/**/*.scss';
const libPaths = ['./lib/**/*.js', './lib/**/*.hbs'];
gulp.task('build-app', () => {
    return browserify('./lib/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/scripts'));
});
gulp.task('build', ['build-app'], () => {
    gulp.watch(libPaths, ['build-app']);
});
gulp.task('default', ['build-app'], () => { });
