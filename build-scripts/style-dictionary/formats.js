/**
 * Custom StyleDictionary formats that can be registered via
 * `StyleDictionary.registerFormat()`.
 */

const path = require('path');
const nunjucks = require('nunjucks');


module.exports = {
  colorSchemeScss: {
    name: 'scss/color-scheme',
    formatter: (dictionary, config) => {
      return nunjucks.render(path.resolve(__dirname, 'formats/color-scheme-scss.nunj'), {
        dictionary,
        config
      });
    }
  },

  colorSchemeTs: {
    name: 'ts/color-scheme',
    formatter: (dictionary, config) => {
      return nunjucks.render(path.resolve(__dirname, 'formats/color-scheme-ts.nunj'), {
        dictionary,
        config
      });
    }
  }
};
