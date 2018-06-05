module.exports = {
  moduleDirectories: [
    'components',
    'node_modules'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^utils(.*)$': '<rootDir>/utils$1'
  },
  setupFiles: [
    './jestSetup.js'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ]
};
