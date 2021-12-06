// Load env vars
require("dotenv").config();

const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const contract = require("./artifacts/contracts/Myplants.sol/Myplants.json")

const mnemonicPhrase = process.env.ACCOUNT_MNEMONIC;
const rinkebyEndpoint = process.env.RINKEBY_ENDPOINT;

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: rinkebyEndpoint
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log("Attempting to deploy from account", accounts[0])

  const result = await new web3.eth.Contract(contract.abi)
    .deploy({ data: contract.bytecode, arguments: [] })
    .send({ from: accounts[0], gas: '10000000' });

  console.log("Contract deploy to", result.options.address)
  provider.engine.stop()
}

deploy()