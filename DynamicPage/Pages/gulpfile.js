var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

gulp.task('minify-css', function () {
    return gulp.src('assets/css/*.css')
        .pipe(concat('Style-Min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('assets'));
});