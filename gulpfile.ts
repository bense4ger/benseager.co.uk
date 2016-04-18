///<reference path="./typings/main.d.ts" />
import * as gulp from 'gulp';
import * as browserify from 'browserify';
import * as source from 'vinyl-source-stream';

const sassPath = './scss/**/*.scss';
const libPaths = ['./lib/**/*.js', './lib/**/*.vue'];

gulp.task('build-app', () => {
    return browserify('./lib/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('build', ['build-app'], () => {
    gulp.watch(libPaths,['build-app']);
});

gulp.task('default', ['build-app'], () => {});

