# Token_SmartContract
This is a truffle based project having ERC20 token with extra features of letting token holders deposit &amp; withdraw their tokens.

# Documentation
Code level documentation can be found within smartcontract at `contracts/Token.sol`

# Testing
To deploy & test smartcontract as per the test-cases written at `test/token-test.js`. Please following steps mentioned below:

## 1. Start Local Node:
If you want to test this smartcontract on local network (Ganache), you can start your local node by command mentioned below:
```code
npm run ganache
```
if you don't have installed first ganache make sure run following command first before executing command mentioned above:
```code
npm install -g ganache
```

## 2. Run test cases
To run run test-cases
```code
npm run test
```
`Note:` In these test-cases 10 users submitting 1000 withdrawal requests collectively, which will be processed by backend-service.

To deploy & run backend-service, please visit its repository mentioned below.
https://github.com/naveed949/TokensWithdrawalService

# Ready to Test
If you want to interact with already deployed same contract with your Metamask, sharing below verified smartcontract on `rinkebyscan`.

https://rinkeby.etherscan.io/address/0x24625a70157b28bcB7a83FA418dA593acC3CD501#writeContract

**Note**: this contract's admin is `0x70B570609Fa0eBD2C8af9515504E1d1884081ef9` its private key is shared in withdraw service [link](https://github.com/naveed949/TokensWithdrawalService/blob/a4b2da72bdd48c08b7454726ca681277b455f60b/utils/constants.json#L4) fill the remaining details to setup withdraw service as per its doc and your good to go to test deposit & withdraw features.

Please note that initially admin account has all PL tokens, you should transfer first these token to other users so they can deposit & withdraw later.
