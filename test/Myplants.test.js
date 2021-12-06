const ganache = require('ganache-cli');
const { beforeEach, it, describe } = require('mocha');
const Web3 = require('web3')
const contract = require("../artifacts/contracts/Myplants.sol/Myplants.json")

const web3 = new Web3(ganache.provider());
assert = require('assert');

let accounts, nft;

beforeEach(async () => {
  // Fetch test accounts from ganache provider
  accounts = await web3.eth.getAccounts()

  // Deploy the contract with one of the accounts
  nft = await new web3.eth.Contract(contract.abi)
    .deploy({ data: contract.bytecode, arguments: [] })
    .send({ from: accounts[0], gas: '4712388' })
})

describe("Myplants", () => {
  it("deploys a contract", () => {
     assert.ok(nft.options.address);
  })

  it("do not have a default uri", async () => {
     const uri = await nft.methods.uri(0).call();
     assert.equal(uri, "");
  })
  
  it("set nft metadata", async () => {
     await nft.methods.setTokenUri(0, "https://test.com").send({ from: accounts[0] });
     const uri = await nft.methods.uri(0).call();
     assert.equal(uri, "https://test.com");

  })

  // it('can change the message', async () => {
  //   const newMsg = "new message here!!"
  //   await myplants.methods.setMessage(newMsg).send({ from: accounts[1] });
  //   const message = await myplants.methods.message().call();
  //   assert.equal(message, newMsg);
  // })
})