/**
 * Exports non-published file paths used by the build.
 */

const path = require('path');
const bldConsts = require('../build-consts');


// Resolves the given path segments relative to the source dir
function srcPath(...pathSegements) {
  return path.resolve(__dirname, '..', bldConsts.srcDirname, ...pathSegements);
}


module.exports = {
  /**
   * Takes a sequence of path segments relative to tokens source directory
   * and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the tokens source directory.
   *
   * @return {string} Absolute file path to the specified source
   *        directory or file.
   */
  srcTokensPath: (...pathSegments) => srcPath('tokens', ...pathSegments)

};
