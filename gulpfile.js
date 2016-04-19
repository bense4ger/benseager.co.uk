"use strict";
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sassPath = './scss/**/*.scss';
var libPaths = ['./lib/**/*.js', './lib/**/*.hbs'];
gulp.task('build-app', function () {
    return browserify('./lib/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/scripts'));
});
gulp.task('build', ['build-app'], function () {
    gulp.watch(libPaths, ['build-app']);
});
gulp.task('default', ['build-app'], function () { });
