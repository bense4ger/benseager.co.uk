'use strict';

var gulp = require('gulp'),
    markdown = require('gulp-markdown-to-json'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    hbsfy = require('hbsfy'),
    source = require('vinyl-source-stream');

hbsfy.configure({
    extensions: ['hbs']
});

gulp.task('build-app', () => {
    return browserify('./app/main.js')
    .transform(babelify, { presets: ['es2015'] })
    .transform(hbsfy)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('create-json', () => {
    return gulp.src('./content/**/*.md')
        .pipe(markdown({
            pedantic: true,
            smartypants: true
        }))
        .pipe(gulp.dest('dist/content/'));

});

gulp.task('build', ['build-app', 'create-json'], () => {
    gulp.watch('./app/**/*.js', ['build-app']);
    gulp.watch('./content/**/*.md', ['create-json']);
});

gulp.task('default', ['build']);
