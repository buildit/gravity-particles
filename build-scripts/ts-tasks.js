const gulp = require('gulp');
const ts = require('gulp-typescript');
const nunjucksRender = require('gulp-nunjucks-render');
const camelCase = require('lodash.camelcase');

const bldApi = require('../build-api');
const bldPaths = require('./build-paths');

function generateIndexTs() {
  return gulp.src(bldPaths.srcTsPath('**','*.njk'))
    .pipe(nunjucksRender({
      ext: '',
      data: {
        // import name -> base filename
        colorGroups: bldPaths.colorGroups.reduce((acc, group) => {
            acc[camelCase(group)] = bldPaths.distColorFilename(group);
            return acc;
          },
          {}
        ),
      }
    }))
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

module.exports = {
  processTs: gulp.series(
    generateIndexTs,
    compileTs,
  ),
};
