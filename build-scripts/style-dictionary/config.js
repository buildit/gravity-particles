/**
 * Returns a configured StyleDictiory instance.
 */
const path = require('path');

const bldApi = require('../../build-api');
const bldPaths = require('../build-paths');
const sdTransforms = require('./transforms');
const sdFilters = require('./filters');
const sdFormats = require('./formats');
const aseFormat = require('./format-ase');

/**
 * Configure StyleDictionary with ALL THE THINGS and
 * export it.
 */
let customisedStyleDictionary = require('style-dictionary');

/*
  Create { groupName: filterFn, ... } map for
  all known color groups.
*/
const colorGroupFilters = bldPaths.colorGroups.reduce(
  (acc, group) => {
    acc[group] = sdFilters.isColorFromGroup(group);
    return acc;
  },
  {}
);

// Register filters
customisedStyleDictionary = customisedStyleDictionary.registerFilter(sdFilters.isColor)
  .registerFilter(sdFilters.isColorScheme);

bldPaths.colorGroups.forEach(group => {
  customisedStyleDictionary = customisedStyleDictionary.registerFilter(colorGroupFilters[group]);
});

// Register transforms
customisedStyleDictionary = customisedStyleDictionary.registerTransform(sdTransforms.gravitySassVarName)
  .registerTransform(sdTransforms.gravityHumanColorName)
  .registerTransform(sdTransforms.gravitySketchColor)
  .registerTransform(sdTransforms.gravityAseColor);

// Register transform groups
customisedStyleDictionary = customisedStyleDictionary.registerTransformGroup({
    name: 'gravity-ts',
    transforms: ['attribute/cti', 'name/cti/camel', 'color/css']
  })
  .registerTransformGroup({
    name: 'gravity-sketch',
    transforms: ['attribute/cti', 'name/cti/camel', sdTransforms.gravitySketchColor.name]
  })
  .registerTransformGroup({
    name: 'gravity-ase',
    transforms: ['attribute/cti', sdTransforms.gravityHumanColorName.name, sdTransforms.gravityAseColor.name]
  })
  .registerTransformGroup({
    name: 'gravity-macOS',
    transforms: ['attribute/cti', 'name/human', 'color/css']
  })
  .registerTransformGroup({
    name: 'ios-swift',
    transforms: ['attribute/cti', 'name/cti/camel', 'color/UIColorSwift']
  })
  .registerTransformGroup({
    name: 'ios',
    transforms: ['attribute/cti', 'name/cti/camel', 'color/UIColor']
  })
  .registerTransformGroup({
    name: 'android',
    transforms: ['attribute/cti', 'name/cti/camel', 'color/hex']
  });

// Register formats
customisedStyleDictionary = customisedStyleDictionary.registerFormat(sdFormats.colorsScss)
  .registerFormat(sdFormats.colorSchemeScss)
  .registerFormat(sdFormats.colorsTs)
  .registerFormat(sdFormats.colorSchemeTs)
  .registerFormat(sdFormats.colorSchemeSketch)
  .registerFormat(sdFormats.colorSchemeMacOS)
  .registerFormat(aseFormat);

// Configure
customisedStyleDictionary = customisedStyleDictionary.extend({
    source: [
      bldPaths.srcTokensPath('**', '*.json')
    ],
    platforms: {
      // EXPERIMENTAL Swift ouptut
      swift: {
        transformGroup: 'ios-swift',
        buildPath: `${bldApi.distPath('swift')}${path.sep}`,
        files: [
          {
            className: 'GravityColors',
            destination: 'GravityColors.swift',
            format: 'ios-swift/class.swift'
          }
        ]
      },

      // EXPERIMENTAL iOS Objective-C ouptut
      ios: {
        transformGroup: 'ios',
        buildPath: `${bldApi.distPath('ios')}${path.sep}`,
        files: [
          {
            className: 'GravityColors',
            destination: 'GravityColors.h',
            format: 'ios/colors.h'
          },
          {
            className: 'GravityColors',
            destination: 'GravityColors.m',
            format: 'ios/colors.m'
          },
        ]
      },

      // EXPERIMENTAL Android ouptut
      android: {
        transformGroup: 'android',
        buildPath: `${bldApi.distPath('android')}${path.sep}`,
        files: [
          {
            className: 'GravityColors',
            destination: 'GravityColors.xml',
            format: 'android/colors'
          }
        ]
      },

      // SCSS output
      scss: {
        transformGroup: 'scss',
        buildPath: `${bldApi.distPath('scss')}${path.sep}`,
        files: [
          {
            filter: 'isColorScheme',
            destination: 'color-schemes.scss',
            format: sdFormats.colorSchemeScss.name
          },

          // per-color-group files
          ...bldPaths.colorGroups.map(group => ({
            filter: colorGroupFilters[group].name,
            destination: bldPaths.distColorFilename(group, 'scss'),
            format: sdFormats.colorsScss.name
          })),
        ]
      },

      // TypeScript output
      ts: {
        transformGroup: 'gravity-ts',
        buildPath: `${bldPaths.tmpTsPath()}${path.sep}`,
        files: [
          {
            filter: 'isColorScheme',
            destination: 'color-schemes.ts',
            format: sdFormats.colorSchemeTs.name
          },

          // per-color-group files
          ...bldPaths.colorGroups.map(group => ({
            filter: colorGroupFilters[group].name,
            destination: bldPaths.distColorFilename(group, 'ts'),
            format: sdFormats.colorsTs.name
          })),
        ]
      },

      // Sketch
      sketch: {
        transformGroup: 'gravity-sketch',
        buildPath: `${bldApi.distPath('sketch')}${path.sep}`,
        files: [
          // per-color-group files
          ...bldPaths.colorGroups.map(group => ({
            filter: colorGroupFilters[group].name,
            destination: bldPaths.distColorFilename(group, 'sketchpalette'),
            format: sdFormats.colorSchemeSketch.name
          })),
        ]
      },

      // macOS Color Palette
      macOS: {
        transformGroup: 'gravity-macOS',
        buildPath: `${bldPaths.tmpMacOsPath()}${path.sep}`,
        files: [
          // per-color-group files
          ...bldPaths.colorGroups.map(group => ({
            filter: colorGroupFilters[group].name,
            destination: bldPaths.distColorFilename(group, 'txt'),
            format: sdFormats.colorSchemeMacOS.name
          })),
        ]
      },

      // Adobe Swatch Exchange (ASE)
      ase: {
        transformGroup: 'gravity-ase',
        buildPath: `${bldApi.distPath('ase')}${path.sep}`,
        files: [
          // per-color-group files
          ...bldPaths.colorGroups.map(group => ({
            filter: colorGroupFilters[group].name,
            destination: bldPaths.distColorFilename(group, 'ase'),
            format: aseFormat.name
          })),
        ]
      },
    },
  });

  module.exports = customisedStyleDictionary;
