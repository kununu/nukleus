module.exports = {
  moduleDirectories: [
    'src/components',
    'node_modules',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^utils(.*)$': '<rootDir>/utils$1',
  },
  setupFiles: [
    './jest.setup.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testURL: 'http://localhost',
};
