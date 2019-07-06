const gulp = require('gulp');
const livereload = require("gulp-livereload");
const concat = require("gulp-concat");
const minifyCss = require("gulp-minify-css");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const imagemin  = require('gulp-imagemin');

// const sass = require("gulp-sass");
// const babel = require("gulp-babel");


const dist_PATH = "public/dist";
// const scripts_PATH = "public/scripts/**/*.js";
const css_PATH = "public/css/**/*.css";
const images_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}'
// const sass_PATH = "public/scss/main.scss";
// const reset_PAHT = "public/css/reset.css";
// const TEMPLATES_PATH = "templates/**/*.hbs";

// styles
gulp.task("styles", function() {
  console.log("starting");
  return gulp
    .src([ css_PATH])
    .pipe(
      plumber(function(err) {
        console.log("styles error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat("styles.css"))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist_PATH))
    .pipe(livereload());
});


gulp.task("images", function() {
 return gulp.src(images_PATH)
.pipe(imagemin(
  [
    imagemin.gifsicle(),
    imagemin.jpegtran(),
    imagemin.optipng(),
    imagemin.svgo(),
    imageminPngquant(),
    imageminJpegRecompress()
  ]
))
.pipe(gulp.dest(dist_PATH + '/images')
)});

// gulp.task('default' , async function() {
//     console.log('tasking')
// })

