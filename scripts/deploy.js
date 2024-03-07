const { ethers, run, network } = require("hardhat") //hardhat的好处是可以自动识别contracts包下面的已经编译好的合约，而ethers不可以
require("dotenv").config()
async function mian() {
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying Contract  ....")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    console.log(`Deployed  Contract  to  : ${simpleStorage.target} `) //target相当于address
    //console.log(network.config)//通过输出的chainid可以看到连接的哪个测试网络
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        //只有当在sepolia测试网才可以验证，并且要有以太坊浏览器的api接口，hardhat是本地的区块链，所以无法在以太坊浏览器验证
        //x===x  与  x==x作用相同
        console.log("waiting  for  block  txes...")
        //await simpleStorage.deploymentTransaction().wait(6)
        await verify(simpleStorage.target, [])
    }
    const currentValue = await simpleStorage.retrieve() //retrieve函数只是获得值，而不是修改值，故不需要等待区块，因此就不需要用await和wait
    console.log(`Current Value is :  ${currentValue}`)
    //update the value
    const transactionResponse = await simpleStorage.store(9) //////////////////////////////////////////////////////////////////
    await transactionResponse.wait(1)
    const updatevalue = await simpleStorage.retrieve()
    console.log(`The update value is : ${updatevalue}`)
}
async function verify(ContractAddress, args) {
    //args代表构造函数的参数
    console.log("verifying   contracts ......")
    try {
        await run("verify:verify", {
            //第二个verify是相当于verify的一个功能，用来验证的
            address: ContractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!") //如果异常消息中包含 "already verified"，则输出 "Already Verified!"，否则打印异常信息。
        } else {
            console.log(e)
        }
    }
}
mian()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
