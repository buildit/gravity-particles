const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');

const bldApi = require('./build-api');
const bldPaths = require('./build-scripts/build-paths');
const gravityStyleDictionary = require('./build-scripts/style-dictionary/config');


function clean() {
  return del([
    bldApi.distPath('**', '*'),
    bldPaths.tmpPath('**', '*')
  ]);
}


function styleDictionary(done) {
  gravityStyleDictionary.buildAllPlatforms();
  done();
}

function copyTs() {
  return gulp.src(bldPaths.srcTsPath('**','*.ts'))
    .pipe(gulp.dest(bldPaths.tmpTsPath()));
}

function compileTs() {
  return gulp.src(bldPaths.tmpTsPath('**', '*.ts'))
    .pipe(ts({
      declaration: true,
      module: 'CommonJS',
      strict: true,
      target: 'ES6',
    }))
    .pipe(gulp.dest(bldApi.distPath('js')));
}



const build = gulp.series(
  styleDictionary,
  copyTs,
  compileTs
);


module.exports = {
  default: build,

  clean
};
