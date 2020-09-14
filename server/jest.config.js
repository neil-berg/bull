const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  transform: tsjPreset.transform,
  moduleFileExtensions: ['ts', 'js'],
  preset: '@shelf/jest-mongodb',
};
