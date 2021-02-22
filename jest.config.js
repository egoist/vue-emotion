module.exports = {
  roots: ['./'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/**/*/__tests__/*.test.+(ts|js)',
  ],
  testPathIgnorePatterns: [
    'node_modules',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/setupTest.js',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'vue', 'node', 'jsx', 'json'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(js|ts)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules'
  ],
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
}
