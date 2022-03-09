module.exports = {
  globalSetup: '<rootDir>/jest.setup.js',
  setupFiles: ['<rootDir>/src/test/.jest/register-context.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  testRegex: '(/__tests__/*|(\\.|/)spec)\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  testEnvironment: 'jsdom',
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.vue',
    '<rootDir>/src/**/*.js',
    '<rootDir>/src/**/*.ts'
  ],
  forceExit: !!process.env.CI
}
