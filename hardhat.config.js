require("dotenv").config() //dotenv用来加载环境变量
require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-verify")
require("hardhat-deploy")
require("./tasks/block-number") //相对路径导入
const { ProxyAgent, setGlobalDispatcher } = require("undici")
const proxyAgent = new ProxyAgent("http://127.0.0.1:7890")
setGlobalDispatcher(proxyAgent)
/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
module.exports = {
    defaultNetwork: "hardhat", //这里的hardhat-network每次新执行一次脚本都会重置
    solidity: "0.8.7",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            gasPrice: 1500000000,
        },
        localhost: {
            //本地的区块链，类似于ganache，本地地址的8545端口运行的
            url: "http://127.0.0.1:8545/",
            //不用添加私钥，因为hardhat已经给了
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}
