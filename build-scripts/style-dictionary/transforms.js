/**
 * Custom StyleDictionary name transforms that can be registered via
 * `StyleDictionary.registerTransform()`.
 */
const Color = require('tinycolor2');
const kebabCase = require('lodash.kebabcase');
const startCase = require('lodash.startcase');

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
  gravitySassVarName: {
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

  /**
   * Transforms a color properties name into a human-friendly format suitable
   * for display.
   */
  gravityHumanColorName: {
    name: "name/gravity/human-color-name",
    type: "name",
    matcher: function(prop) {
      return prop.attributes.category === 'color';
    },
    transformer: function(prop, config) {
      const colorName = startCase(prop.attributes.item);
      let tintOrSwatchName = '';
      if (prop.attributes.subitem !== 'base') {
        tintOrSwatchName = ` - ${startCase(prop.attributes.subitem)}`;
      }
      return `${colorName}${tintOrSwatchName}`;
    }
  },

  gravitySketchColor: {
    name: 'value/gravity/sketch-color',
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

  /**
   * Transforms a color property's value to an array of the R, G and B values
   * expressed as floats.
   */
  gravityAseColor: {
    name: 'value/gravity/ase-color',
    type: 'value',
    matcher: function(prop) {
      return prop.attributes.category === 'color';
    },
    transformer: function (prop) {
      const { r, g, b } = Color(prop.value).toRgb();
      const rFloat = (r / 255.0);
      const gFloat = (g / 255.0);
      const bFloat = (b / 255.0);
      return [rFloat, gFloat, bFloat];
    }
  },
};
