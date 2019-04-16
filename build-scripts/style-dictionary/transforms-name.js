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
  }
};
