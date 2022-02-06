const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const prefixer = require("autoprefixer");
const sourceMaps = require("gulp-sourcemaps");

// Sass Compilation
const buildCSS = function () {
  return src(["./src/scss/*.scss", "./src/scss/**/*.scss"])
    .pipe(sass())
    .pipe(sourceMaps.init())
    .pipe(postcss([cssnano(), prefixer()]))
    .pipe(sourceMaps.write("."))
    .pipe(dest("./dist/css"));
};

// Watch Task
const watchTask = function () {
  watch(["./src/scss/*.scss", "./src/scss/**/*.scss"], buildCSS);
};

exports.default = series(buildCSS, watchTask);
