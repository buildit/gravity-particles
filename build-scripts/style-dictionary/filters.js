/**
 * Custom StyleDictionary filters that can be registered via
 * `StyleDictionary.registerFilter()`.
 */
const startCase = require('lodash.startcase');

module.exports = {
  /**
   * Matches properties whose category is "colorScheme".
   */
  isColorScheme: {
    name: 'isColorScheme',
    matcher: prop => prop.attributes.category === 'colorScheme'
  },

  /**
   * Matches properties whose category is "color".
   */
  isColor: {
    name: 'isColor',
    matcher: prop => prop.attributes.category === 'color'
  },

  /**
   *  Creates a filter that matches properties whose category
   *  is "color" and type is the given `group`.
   */
  isColorFromGroup: (group) => ({
    name: `isColorFrom${startCase(group)}`,
    matcher: prop => (prop.attributes.category === 'color' && prop.attributes.type === group)
  }),
};
