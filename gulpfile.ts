///<reference path="./typings/main.d.ts" />
import * as gulp from 'gulp';
import * as sass from 'gulp-sass';
import * as concat from 'gulp-concat';
import * as browserify from 'browserify';
import * as source from 'vinyl-source-stream';

const sassPath = './scss/**/*.scss';
const libPaths = ['./lib/**/*.js', './lib/**/*.hbs'];

const distScriptPath = './dist/scripts';
const cssPath = './dist/css';

gulp.task('build-app', () => {
    return browserify('./lib/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(distScriptPath));
});

gulp.task('sass', () => {
    return gulp.src(sassPath)
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', sass.logError)
        .pipe(concat('site.min.css'))
        .pipe(gulp.dest(cssPath))
});

gulp.task('build', ['build-app', 'sass'], () => {});

gulp.task('default', ['build-app', 'sass'], () => {
    gulp.watch(libPaths,['build-app']);
    gulp.watch(sassPath, ['sass']);
});

