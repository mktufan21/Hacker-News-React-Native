module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)',
  ],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        statusIgnoreFilter: 'passed',
        includeFailureMsg: true,
        includeConsoleLog: false,
        outputPath: './coverage/test-report.html',
      },
    ],
  ],

  automock: false,
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['text', 'html', 'lcov', 'json'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/coverage/',
  ],
  testMatch: ['<rootDir>/__tests__/*.js'],
};
