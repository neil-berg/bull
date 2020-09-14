const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  preset: '@shelf/jest-mongodb',
  testMatch: ['<rootDir>/**/*.ts'],
  transform: tsjPreset.transform,
  transformIgnorePatterns: ['^.+\\.js$'],
};
