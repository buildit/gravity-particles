const Color = require('color');
const styleDictionary = require('../build-scripts/style-dictionary/config');

const designTokens = styleDictionary.exportPlatform('ts');
const contrastRatioAA = 4.5;
const contrastRatioAALargeText = 3;

// Purposes that must achieve higher contrast ratios
const groupAStrictPurposes = [
  'neutral',
  'neutralAlt',
];

const groupBStrictPurposes = [
  'neutral',
  'neutralSubtle',
  'neutralEmphasis',
];

// Generate a test suite for each color scheme
Object.keys(designTokens.colorScheme).forEach((colorSchemeName) => {

  describe(`Color scheme "${colorSchemeName}"`, () => {
    let colorScheme = designTokens.colorScheme[colorSchemeName];

    // Generate test for each possible color pairing
    Object.keys(colorScheme.groupA).forEach((groupAColorPurposeName) => {
      Object.keys(colorScheme.groupB).forEach((groupBColorPurposeName) => {
        let targetContrastRatio = contrastRatioAALargeText;
        if (groupAStrictPurposes.includes(groupAColorPurposeName) || groupBStrictPurposes.includes(groupBColorPurposeName)) {
          // Expect higher contrast ratio
          targetContrastRatio = contrastRatioAA;
        }

        test(`group A "${groupAColorPurposeName}" and group B "${groupBColorPurposeName}" contrast ratio is greater than ${targetContrastRatio}:1`, () => {
          const groupAColor = new Color(colorScheme.groupA[groupAColorPurposeName].value);
          const groupBColor = new Color(colorScheme.groupB[groupBColorPurposeName].value);

          expect(groupAColor.contrast(groupBColor)).toBeGreaterThanOrEqual(targetContrastRatio);
        });
      });
    });



  });
});
