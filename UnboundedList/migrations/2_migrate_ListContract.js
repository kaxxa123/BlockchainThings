const ListContract = artifacts.require("ListContract");

module.exports = function(deployer) {
  deployer.deploy(ListContract);
};
