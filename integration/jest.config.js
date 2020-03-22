/* global jest */

module.exports = {
    verbose: true,
    projects: ["<rootDir>/jest.config.js"],
    collectCoverageFrom: [
        "<rootDir>/tests/**/*.{ts,js}"
    ],
    testMatch: [
        "<rootDir>/tests/**/*.{ts,js}"
    ],
    moduleFileExtensions: [
        "node",
        "js",
        "ts"
    ],
    moduleDirectories: ["node_modules"],
    preset: "ts-jest"
};