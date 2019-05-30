/**
 * Exports non-published file paths used by the build.
 */

const path = require('path');
const bldConsts = require('../build-consts');

// Resolves the given path segments relative to the package root
function pkgPath(...pathSegements) {
  return path.resolve(__dirname, '..', ...pathSegements);
}


// Resolves the given path segments relative to the source dir
function srcPath(...pathSegements) {
  return pkgPath(bldConsts.srcDirname, ...pathSegements);
}

// Resolves the given path segments relative to the source dir
function tmpPath(...pathSegements) {
  return pkgPath('.tmp', ...pathSegements);
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
  srcTokensPath: (...pathSegments) => srcPath('tokens', ...pathSegments),

  /**
   * Takes a sequence of path segments relative to TypeScript source directory
   * and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the TypeScript source directory.
   *
   * @return {string} Absolute file path to the specified source
   *        directory or file.
   */
  srcTsPath: (...pathSegments) => srcPath('ts', ...pathSegments),

  /**
   * Takes a sequence of path segments relative to the temporary
   * path for intermediate build output.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the tmp directory.
   *
   * @return {string} Absolute file path to the specified tmp
   *        directory or file.
   */
  tmpPath,

  /**
   * Takes a sequence of path segments relative to the temporary TypeScript
   * path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the TypeScript tmp directory.
   *
   * @return {string} Absolute file path to the specified tmp
   *        directory or file.
   */
  tmpTsPath: (...pathSegments) => tmpPath('ts', ...pathSegments),

  /**
   * Takes a sequence of path segments relative to the temporary macOS
   * path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the macOS tmp directory.
   *
   * @return {string} Absolute file path to the specified tmp
   *        directory or file.
   */
  tmpMacOsPath: (...pathSegments) => tmpPath('macOS', ...pathSegments),

};
