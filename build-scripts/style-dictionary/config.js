/**
 * Returns a configured StyleDictiory instance.
 */
const path = require('path');

const bldApi = require('../../build-api');
const bldPaths = require('../build-paths');
const sdNameTransforms = require('./transforms-name');
const sdFilters = require('./filters');
const sdFormats = require('./formats');

/**
 * Configure StyleDictionary with ALL THE THINGS and
 * export it.
 */
module.exports = require('style-dictionary')
  .registerFilter(sdFilters.isColor)
  .registerFilter(sdFilters.isColorScheme)
  .registerTransform(sdNameTransforms.gravitySassVar)
  .registerTransform(sdNameTransforms.gravitySketch)
  .registerTransformGroup({
    name: 'gravity-scss',
    transforms: ['attribute/cti', sdNameTransforms.gravitySassVar.name, 'color/css']
  })
  .registerTransformGroup({
    name: 'gravity-ts',
    transforms: ['attribute/cti', 'name/cti/camel', 'color/css']
  })
  .registerTransformGroup({
    name: 'gravity-sketch',
    transforms: ['attribute/cti', 'name/cti/camel', 'value/gravity/sketch']
  })
  .registerFormat(sdFormats.colorsScss)
  .registerFormat(sdFormats.colorSchemeScss)
  .registerFormat(sdFormats.colorsTs)
  .registerFormat(sdFormats.colorSchemeTs)
  .registerFormat(sdFormats.colorSchemeSketch)
  .extend({
    source: [
      bldPaths.srcTokensPath('**', '*.json')
    ],
    platforms: {
      // SCSS output
      scss: {
        transformGroup: 'gravity-scss',
        buildPath: `${bldApi.distPath('scss')}${path.sep}`,
        files: [
          {
            filter: 'isColor',
            destination: 'colors.scss',
            format: sdFormats.colorsScss.name
          },
          {
            filter: 'isColorScheme',
            destination: 'color-schemes.scss',
            format: sdFormats.colorSchemeScss.name
          }
        ]
      },

      // TypeScript output
      ts: {
        transformGroup: 'gravity-ts',
        buildPath: `${bldPaths.tmpTsPath()}${path.sep}`,
        files: [
          {
            filter: 'isColor',
            destination: 'colors.ts',
            format: sdFormats.colorsTs.name
          },
          {
            filter: 'isColorScheme',
            destination: 'color-schemes.ts',
            format: sdFormats.colorSchemeTs.name
          }
        ]
      },

      // Sketch
      sketch: {
        transformGroup: 'gravity-sketch',
        buildPath: `${bldApi.distPath('sketch')}${path.sep}`,
        files: [
          {
            destination: 'wipro.sketchpalette',
            format: sdFormats.colorSchemeSketch.name
          },
          {
            destination: 'gravity.sketchpalette',
            format: sdFormats.colorSchemeSketch.name
          }
        ]
      }
    }
  });
