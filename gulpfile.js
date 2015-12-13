var gulp = require('gulp');
var browserSync = require('browser-sync');
var shell = require('gulp-shell');


gulp.task('build', shell.task(['bundle exec jekyll build --watch']));

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: '_site/'
        }
    });
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});


gulp.task('default', ['build', 'serve']);
