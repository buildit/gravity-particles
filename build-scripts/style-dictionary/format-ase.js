const aseUtils = require('ase-utils');


function makeAseColorObject(colorToken) {
  return {
    name: colorToken.name,
    model: 'RGB',
    color: colorToken.value,
    type: 'global',
  };
}

/*
 *  Takes the dictionary object provided by StyleDictionary
 *  and converts it to an object in the format expected by
 *  aseUtils.
 */
function convertStyleDictionaryToAseObject(dictionary) {
  return {
    version: "1.0",
    groups: [],
    colors: dictionary.allProperties.map(colorToken => makeAseColorObject(colorToken)),
  };
}


module.exports = {
  name: 'ase/colors',
  formatter: (dictionary, config) => {
    return aseUtils.encode(convertStyleDictionaryToAseObject(dictionary));
  }
};
