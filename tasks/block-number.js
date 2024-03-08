const { task } = require("hardhat/config") //用于定义自定义任务（tasks）
//代码实现了一个 Hardhat 任务（task），该任务的作用是打印当前以太坊区块链上的区块号（block number）。
//首先从 "hardhat-config" 模块中导入 task 方法。然后，使用 task 方法创建了一个名为 "block-number" 的任务，并通过 setAction 方法指定了任务的具体操作。
task("block-number", "Print the current block number").setAction(
    //const  blockTask = async ()=>{}，在Js中的异步函数可以不加function
    //async function blockTask(){}，这两种方法都可以定义函数
    async (taskArgs, hre) => {
        //hre是hardhat的一个对象，通过 hre 对象，你可以访问 Hardhat 提供的各种功能
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number is : ${blockNumber}`)
    },
)
module.exports = {} //通过这段代码就可以把block-number变成一个，可以通过require方法，导入到hardhat.config的tasks中
//通过 module.exports = {} 将空对象导出，以确保这个任务可以被 Hardhat 正确识别和运行。module 是一个全局对象，用于表示当前模块的信息和导出。
//通过 module.exports = {} 导出一个空对象，确保这个模块仍然是一个有效的模块，并且可以被其他模块引用
