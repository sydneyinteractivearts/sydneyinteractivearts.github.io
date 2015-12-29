var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('livereload', browserSync.reload);

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: false
    });
    
    gulp.watch(['css/main.css', 'index.html'], ['livereload']);
});


gulp.task('default', ['serve']);
