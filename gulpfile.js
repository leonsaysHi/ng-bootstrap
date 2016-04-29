var gulp = require('gulp')
var browserSync = require('browser-sync')
var useref = require('gulp-useref')
var sass = require('gulp-sass')
var angularTemplateCache = require('gulp-angular-templatecache')

// Build

gulp.task('copy', function() {
    return gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('./public'))
})

// Dev

gulp.task('tpls', function() {
  return gulp.src('./app/scripts/**/*.tpl.html')
    .pipe(angularTemplateCache({module:'tpls', standalone:true}))
    .pipe(gulp.dest('./app/scripts'))
})
gulp.task('sass', function() {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
})
gulp.task('serve', function() {
    browserSync.init({
      server: "./app/"
    })
    gulp.watch('./app/scripts/**/*.tpl.html', ['tpls']).on('change', browserSync.reload)
    gulp.watch('./app/sass/**/*.scss', ['sass']).on('change', browserSync.reload)

})

// Tasks

gulp.task('build', ['copy'])
gulp.task('dev', ['sass', 'tpls'])
gulp.task('default', ['dev', 'serve'])
