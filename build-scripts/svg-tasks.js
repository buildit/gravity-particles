const gulp = require('gulp');
const svgo = require('gulp-svgo');

const bldApi = require('../build-api');
const bldPaths = require('./build-paths');

/**
 * Optimise source SVG file and strip off unwanted fill and stroke
 * values, so that only the raw shapes remain.
 */
function cleanAndOptimiseSvgs() {
  return gulp.src(bldPaths.srcSvgPath('**', '*.svg'))
    .pipe(svgo({
      plugins: [
        {
          // Need to switch this off to preserve
          // class attributes in the markup.
          inlineStyles: false,
        },
        {
          // Want to keep titles for later use as alt text.
          removeTitle: false,
        },
        {
          removeViewBox: false,
        },
        {
          removeDimensions: true,
        },
        {
          sortAttrs: true,
        },
        {
          removeOffCanvasPaths: true,
        },
        {
          removeAttrs: {
            attrs: [
              // Illustrator seems to add redundant x=0 and y=0 attributes
              // to the SVG element
              'svg:(x|y):0',

              // Remove any stroke or fill-related attributes
              '(fill|stroke).*',
            ],
          }
        },
        {
          removeStyleElement: true,
        },
        {
          removeScriptElement: true,
        }
      ]
    }))
    .pipe(gulp.dest(bldApi.distWebSvgPath()));
}

module.exports = {
  cleanAndOptimiseSvgs,
};
