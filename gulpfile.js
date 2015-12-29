var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var shell = require('gulp-shell');
var rename = require('gulp-rename');

gulp.task('transpile', function() {
    return gulp.src('js/main.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(rename('main.compiled.js'))
    .pipe(gulp.dest('js/'))
});

gulp.task('livereload', browserSync.reload);

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: false
    });
    
    gulp.watch(['js/main.js', 'index.html'], ['transpile', 'livereload']);
});


gulp.task('default', ['transpile', 'serve']);
