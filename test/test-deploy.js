const { ethes, ethers } = require("hardhat")
const { expect, assert } = require("chai")
//yarn hardhat test --grep ****(两个提示语中的唯一的关键字)
describe("SimpleStorage", function () {
    let simpleStorage, simpleStorageFactory
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectValue = "0"
        assert.equal(currentValue.toString(), expectValue)
    })
    it("Should updata when we call store", async function () {
        //it.only("Should updata when we call store", async function ()  only代表只运行这个
        const expectValue = "9"
        const transactionResponse = await simpleStorage.store(expectValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectValue)
    })
})
