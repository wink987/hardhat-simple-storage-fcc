const { ethers } = require("hardhat") //hardhat的好处是可以自动识别contracts包下面的已经编译好的合约，而ethers不可以

async function mian() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract  ....")
    const simpleStorage = await SimpleStorageFactory.deploy()
    console.log(`Deployed  Contract  to  : ${simpleStorage.target} `)
}
mian()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
