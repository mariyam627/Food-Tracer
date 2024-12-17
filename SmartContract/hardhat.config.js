require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
require('dotenv').config({path: __dirname+'/.env'})
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
require('hardhat-gas-reporter');
require("dotenv").config({ path: ".env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [{
      version: "0.8.20",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000,
        },
      },
    },
    {
      version: "0.8.22",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000,
        },
      },
    }
  ]
  },

  networks: {
    hardhat: {
      chainId: 1337,
      gasPrice: "auto",
      // forking: {
      //    url:'https://eth.drpc.org',
      //   }
    }, 
    // sepolia: {
    //   url: "https://1rpc.io/sepolia",
    //   accounts: [PRIVATE_KEY],
    //   gasPrice: "auto",
    // },
  },
};
