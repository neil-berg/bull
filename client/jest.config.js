/* eslint-disable no-undef */
module.exports = {
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>src/tests/__mocks__/svgrMock.ts',
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?': 'ts-jest',
  },
  verbose: false,
};
