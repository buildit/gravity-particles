/**
 * Provides programatic access to files that are published by the
 * `gravity-particles` NPM package.
 *
 * This is so that consumers of this package can access those files
 * in their own build processes (e.g. to copy them to their build dir)
 * without needing to know the internal directory structure of this
 * package or having to hard-code file paths in their own build
 * scripts.
 *
 * @public
 */

// Note, since this file is included in the published NPM package, it
// must not export paths or filenames that are excluded from the published
// package. Refer to the 'files' section in package.json to see exactly
// what gets published and what does not.

const path = require('path');
const pkgManifest = require('./package.json');
const bldConsts = require('./build-consts.js');

const pkgDir = __dirname;


// Resolves the given path segments relative to the UI lib dist dir
function distPath(...pathSegements) {
  return path.resolve(pkgDir, bldConsts.distDirname, ...pathSegements);
}


module.exports = {
  /**
   * The Gravity UI SASS version.
   *
   * @public
   */
  version: pkgManifest.version,

  // ==== Pre-compiled output: ====

  /**
   * Takes a sequence of path segments relative to the UI library's
   * distributables directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the UI library's distributables directory.
   *
   * @return {string} Absolute file path to the specified
   *        distributable directory or file.
   *
   * @public
   */
  distPath,
};
