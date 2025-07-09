const SimpleToken = artifacts.require("SimpleToken");

module.exports = function (deployer) {
  // Deploy with initial supply of 1,000,000 tokens
  deployer.deploy(SimpleToken, 1000000);
};
