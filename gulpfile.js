"use strict";
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sassPath = './scss/**/*.scss';
var libPaths = ['./lib/**/*.js', './lib/**/*.hbs'];
var distScriptPath = './dist/scripts';
var cssPath = './dist/css';
gulp.task('build-app', function () {
    return browserify('./lib/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(distScriptPath));
});
gulp.task('sass', function () {
    return gulp.src(sassPath)
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', sass.logError)
        .pipe(concat('site.min.css'))
        .pipe(gulp.dest(cssPath));
});
gulp.task('build', ['build-app', 'sass'], function () { });
gulp.task('default', ['build-app', 'sass'], function () {
    gulp.watch(libPaths, ['build-app']);
    gulp.watch(sassPath, ['sass']);
});
