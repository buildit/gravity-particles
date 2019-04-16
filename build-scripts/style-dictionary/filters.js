/**
 * Custom StyleDictionary filters that can be registered via
 * `StyleDictionary.registerFilter()`.
 */

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
  }
};
