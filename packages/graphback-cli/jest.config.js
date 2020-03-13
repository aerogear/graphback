/* eslint-disable */
const baseConfig = require("../../jest.config");
const packageName = require("./package.json").name;

module.exports = {
  ...baseConfig,
  rootDir: '../..',
  'preset': 'ts-jest',
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "jsx",
    "tsx",
    "node"
  ],
  roots: [
    `<rootDir>/packages/${packageName}`,
  ],
  collectCoverageFrom: [
    `<rootDir>/packages/${packageName}/src/**/*`,
  ],
  testRegex: '(/tests/.*)\\.(tsx?)$',
  testURL: 'http://localhost/',
  moduleDirectories: [
      'node_modules',
  ],
  modulePaths: [
      `<rootDir>/packages/${packageName}/src/`,
  ],
  projects: [`<rootDir>/packages/${packageName}/jest.config.js`],
  name: packageName,
  displayName: packageName,
  rootDir: '../..'
};
