module.exports = {
  testMatch: ['<rootDir>/tests/specs/**/*.ts'],
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}
