/**
 * Custom StyleDictionary formats that can be registered via
 * `StyleDictionary.registerFormat()`.
 */

const path = require('path');
const nunjucks = require('nunjucks');
const kebabCase = require('lodash.kebabcase');
const camelCase = require('lodash.camelcase');

const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader());

nunjucksEnv.addFilter(
  'kebab',
  str => kebabCase(str)
);

nunjucksEnv.addFilter(
  'camel',
  str => camelCase(str)
);

module.exports = {
  colorsScss: {
    name: 'scss/colors',
    formatter: (dictionary, config) => {
      return nunjucksEnv.render(path.resolve(__dirname, 'formats/colors-scss.nunj'), {
        dictionary,
        config
      });
    }
  },

  colorSchemeScss: {
    name: 'scss/color-scheme',
    formatter: (dictionary, config) => {
      return nunjucksEnv.render(path.resolve(__dirname, 'formats/color-scheme-scss.nunj'), {
        dictionary,
        config
      });
    }
  },

  colorsTs: {
    name: 'ts/colors',
    formatter: (dictionary, config) => {
      return nunjucksEnv.render(path.resolve(__dirname, 'formats/colors-ts.nunj'), {
        dictionary,
        config
      });
    }
  },

  colorSchemeTs: {
    name: 'ts/color-scheme',
    formatter: (dictionary, config) => {
      return nunjucksEnv.render(path.resolve(__dirname, 'formats/color-scheme-ts.nunj'), {
        dictionary,
        config
      });
    }
  },

  colorSchemeSketch: {
    name: 'sketch/colors',
    formatter: (dictionary, config) => {
      return nunjucksEnv.render(path.resolve(__dirname, 'formats/colors-sketch.nunj'), {
        dictionary,
        config
      });
    }
  }
};
