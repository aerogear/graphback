/* eslint-disable */
const baseConfig = require("../../jest.config");
const packageName = 'graphback-datasync';

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
  rootDir: '../..',
  testPathIgnorePatterns: [
    `<rootDir>/packages/${packageName}/tests/__util__\\.ts`
  ]
};
