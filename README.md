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