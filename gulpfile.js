var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var shell = require('gulp-shell');


gulp.task('transpile', function() {
    return gulp.src('_scripts/main.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('scripts/'))
});

gulp.task('build', shell.task(['bundle exec jekyll build --watch']));

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: '_site/'
        }
    });
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});


gulp.task('default', ['transpile', 'build', 'serve']);