import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config()

const {
    PRIVATE_KEY_1
} = process.env;

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.18",
        settings: {
            optimizer: {
              enabled: true,
              runs: 10000000,
            },
          },
    },

    networks: {
        hardhat: {
            //Fuji Fork
            forking: {
                url: 'https://api.avax-test.network/ext/bc/C/rpc',                
                blockNumber: 19573647
            },
            chainId: 43113,
            accounts: [{privateKey: `${PRIVATE_KEY_1}`, 
                        balance: "1000000000000000000000000000000"}],
        },
  
        fuji: {
            url: 'https://api.avax-test.network/ext/bc/C/rpc',
            gasPrice: 225000000000,
            chainId: 43113,
            //Identical entries will be filtered!
            accounts: [`${PRIVATE_KEY_1}`]
        },
    }
};

export default config;
