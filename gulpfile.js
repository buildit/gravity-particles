const del = require('del');

const bldApi = require('./build-api');
const gravityStyleDictionary = require('./build-scripts/style-dictionary/config');


function clean() {
  return del(bldApi.distPath('**', '*'));
}


function styleDictionary(done) {
  gravityStyleDictionary.buildAllPlatforms();
  done();
}


module.exports = {
  default: styleDictionary,

  clean
};
