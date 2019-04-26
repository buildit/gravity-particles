var Color = require('tinycolor2')

/**
 * Custom StyleDictionary name transforms that can be registered via
 * `StyleDictionary.registerTransform()`.
 */
const kebabCase = require('lodash.kebabcase');

module.exports = {
  /**
   * Transforms a property's name to one that conforms to `gravity-ui-web`'s
   * SASS variable name conventions.
   *
   * The output will always have `grav-` prefixed (but this can be overridden via `options.prefix`).
   * If the property's category corresponds to one of the prefixes in `gravity-ui-web`'s naming
   * conventions (https://github.com/buildit/gravity-ui-web/blob/HEAD/docs/naming-conventions.md#sass), then
   * it will be swapped for that prefix. The type, item and any remaining path segments will be appended in
   * kebab-case style.
   */
  gravitySassVar: {
    name: "name/gravity/sass-var",
    type: "name",
    transformer: function(prop, {prefix = 'grav'} = {}) {
      const propPathRemainder = prop.path.slice(2);

      let category;
      switch (prop.attributes.category) {
        case 'color': {
          category = 'co';
          break;
        }

        case 'colorScheme': {
          category = 'co-scheme';
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

      return kebabCase([prefix, category].concat(propPathRemainder).join(' '));
    }
  },
  gravitySketch: {
    name: 'value/gravity/sketch',
    type: 'value',
    matcher: function(prop) {
      return prop.attributes.category === 'color';
    },
    transformer: function (prop) {
      const { r, g, b, a } = Color(prop.value).toRgb();
      const rFixed = (r / 255.0).toFixed(16);
      const gFixed = (g / 255.0).toFixed(16);
      const bFixed = (b / 255.0).toFixed(16);
      return `"red": ${rFixed}, "green": ${gFixed}, "blue": ${bFixed}, "alpha":${a}`;
    } 
  },
  gravityMacOS: {
    name: 'value/gravity/macOS',
    type: 'value',
    matcher: function(prop) {
      return prop.attributes.category === 'color';
    },
    transformer: function (prop) {
      var rgb = Color(prop.value).toRgb();
      return '[NSColor colorWithDeviceRed:' + (rgb.r/255).toFixed(2) +
             ' green:' + (rgb.g/255).toFixed(2) +
             ' blue:' + (rgb.b/255).toFixed(2) +
             ' alpha:' + rgb.a.toFixed(2) + ']';
    }
  }
};
