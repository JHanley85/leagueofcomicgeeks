let testConfig;

try {
  testConfig = require('../../.test_config.json'); // eslint-disable-line import/no-unresolved
} catch (e) {
  testConfig = {};
}

module.exports = {
  username: testConfig.username || process.env.TEST_USERNAME,
  password: testConfig.password || process.env.TEST_PASSWORD
};
