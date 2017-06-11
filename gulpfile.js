var uglify = require('gulp-uglify'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.src(['src/**/*.js'])
        .pipe(concat())
        .pipe(uglify())
        .pipe(rename({ basename: "ui-router-metadata", suffix: ".min", extname: ".js" }))
        .pipe(gulp.dest('dist/'));
});
