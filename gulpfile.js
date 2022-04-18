var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var php = require('gulp-connect-php');
const sass = require('gulp-sass')(require('sass'));

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

//PHP Server
gulp.task('php', function () {
  php.server({ base: './', port: 80, keepalive: true });
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function () {

  browserSync.init({
    //The proxy path is specific to my setup. You will need ot update this if you want to use browsersync
    proxy: "localhost:80/modelelectronics/app/",
    port: 80
  });

  gulp.watch("app/scss/*.scss", gulp.series('sass'));
  gulp.watch(["app/*.html", "app/*.php"]).on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));