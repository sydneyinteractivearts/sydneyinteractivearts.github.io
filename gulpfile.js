var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var shell = require('gulp-shell');
var rename = require('gulp-rename');

gulp.task('transpile', function() {
    return gulp.src('_scripts/main.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(rename('main-compiled.js'))
    .pipe(gulp.dest('scripts/'))
});

gulp.task('build', shell.task(['bundle exec jekyll build --watch']));

gulp.task('livereload', browserSync.reload);

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: '_site/'
        },
        open: false
    });
    
    gulp.watch('_scripts/**/*.js', ['transpile', 'livereload']);
});


gulp.task('default', ['transpile', 'build', 'serve']);
