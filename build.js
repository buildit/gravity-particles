const StyleDictionary = require('style-dictionary').extend('config.json');
const _ = require('lodash');

StyleDictionary.registerTransform({
  name: "name/gravity/kebab",
  type: "name",
  transformer: function(prop, options) {
    const itemEtc = prop.path.slice(2);

    let category;
    switch (prop.attributes.category) {
      case 'color': {
        category = 'co';
        break;
      }

      case 'space': {
        category = 'sp';
        break;
      }

      case 'stroke': {
        category = 'st';
        break;
      }

      case 'transform': {
        category = 'tr';
        break;
      }

      default: {
        category = prop.attributes.category;
      }
    }

    const name = _.kebabCase([options.prefix, category].concat(itemEtc).join(' '));
    // console.log('Returning: ', name);
    return name;
  }
});

StyleDictionary.registerTransformGroup({
  name: 'gravity-scss',
  transforms: ["attribute/cti", "name/gravity/kebab", "color/css"]
});


StyleDictionary.buildAllPlatforms();
