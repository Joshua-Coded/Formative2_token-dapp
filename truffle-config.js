require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = process.env.MNEMONIC;
const infuraProjectId = process.env.INFURA_PROJECT_ID;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    develop: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*"
    },
    sepolia: {
      provider: () => new HDWalletProvider({
        mnemonic: mnemonic,
        providerOrUrl: `https://sepolia.infura.io/v3/${infuraProjectId}`,
        numberOfAddresses: 1,
        shareNonce: true,
        derivationPath: "m/44'/60'/0'/0/"
      }),
      network_id: 11155111,
      gas: 4500000,
      gasPrice: 20000000000, // 20 gwei
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 10000,
      pollingInterval: 10000
    }
  },

  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        }
      }
    }
  },

  db: {
    enabled: false
  }
};
