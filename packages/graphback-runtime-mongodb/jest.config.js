/* eslint-disable */
const baseConfig = require("../../jest.config");
const packageName = 'graphback-runtime-mongodb';

module.exports = {
  ...baseConfig,
  rootDir: '../..',
  preset: 'ts-jest',
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
      'src/**/*.{ts,tsx}',
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
  rootDir: '../..',
};
