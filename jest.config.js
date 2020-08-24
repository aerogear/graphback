module.exports = {
  verbose: true,
  projects: ["<rootDir>/packages/*/jest.config.js"],
  collectCoverageFrom: [
    "<rootDir>/packages/*/src/**/*.ts"
  ],
  moduleDirectories: ["node_modules"],
  preset: "ts-jest",
  testTimeout: 60000
};
