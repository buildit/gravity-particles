const gulp = require('gulp');
const del = require('del');

const bldApi = require('./build-api');
const bldPaths = require('./build-scripts/build-paths');

const macOsClrTasks = require('./build-scripts/macos-clr-tasks');
const svgTasks = require('./build-scripts/svg-tasks');
const tsTasks = require('./build-scripts/ts-tasks');

const gravityStyleDictionary = require('./build-scripts/style-dictionary/config');


function clean() {
  return del([
    bldApi.distPath('**', '*'),
    bldPaths.tmpPath('**', '*')
  ]);
}

function cleanBin() {
  return del([
    bldPaths.tmpBinPath('**', '*')
  ]);
}


function styleDictionary(done) {
  gravityStyleDictionary.buildAllPlatforms();
  done();
}


const build = gulp.series(
  styleDictionary,
  gulp.parallel(
    macOsClrTasks.convertToClr,
    tsTasks.processTs,
    svgTasks.cleanAndOptimiseSvgs,
  ),
);


module.exports = {
  default: build,

  clean,
  'clean-bin': cleanBin
};
