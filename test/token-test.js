const TOKEN = artifacts.require("Token");
const TruffleAssert = require('truffle-assert');

contract("Token", function(accounts) {
  let token;
  let admin = accounts[0]
  let userA = accounts[1]
  let userB = accounts[2]
  let user3 = accounts[3]
  let user4 = accounts[4]
  let user5 = accounts[5]
  let user6 = accounts[6]
  let user7 = accounts[7]
  let user8 = accounts[8]
  let user9 = accounts[9]

  let deployed = false;
  let id;

  console.log("admin: "+admin)
  console.log("userA: "+userA)
  console.log("userB: "+userB)

  it("should deploy ERC20 token(MT)", async function() {
    if (deployed){
      token = await TOKEN.at("0x71fefC2B5C6c8fF8bDAAC1025baDdF498298F015");
      return;
    }
    const name = "MyToken";
    const symbol = "MT";
    const supply = web3.utils.toWei("99999999999999999999999");
    token = await TOKEN.new(name, symbol, supply, {from: admin});
    console.log("Token:: "+token.address)
    assert.isTrue(token.address != null);
    
  });
  return;
  it("userA should deposit 10 MT", async function() {
// return;
    const balance = web3.utils.toWei("200");
    const amount = web3.utils.toWei("100");
    // transferring MT froma admin to userA, so userA can be able to deposit later
    for (let i = 1; i < 4; i++) {
      //  token.transfer(accounts[i],balance,{from: admin} )
      // await token.deposit(amount, {from: accounts[i]})
      await token.deposit(amount, {from: admin})
    }
    // await 
    // await token.transfer(userB,balance,{from: admin} )
    // await token.transfer(user3,balance,{from: admin} )
    // await token.transfer(user4,balance,{from: admin} )
    // await token.transfer(user5,balance,{from: admin} )
    // await token.transfer(user6,balance,{from: admin} )
    // await token.transfer(user7,balance,{from: admin} )
    // await token.transfer(user8,balance,{from: admin} )
    // await token.transfer(user9,balance,{from: admin} )
    // depositing MT by userA
    // let tx = await token.deposit(amount, {from: userA})
    //   await 
    //   await token.deposit(amount, {from: user3})
    //   await token.deposit(amount, {from: user4})
    //   await token.deposit(amount, {from: user5})
    //   await token.deposit(amount, {from: user6})
    //   await token.deposit(amount, {from: user7})
    //   await token.deposit(amount, {from: user8})
    //   await token.deposit(amount, {from: user9})
    // TruffleAssert.eventEmitted(tx, "Deposit", ev =>{
    //   return ev.depositer == userA && ev.amount.toString() == ""+amount;
    // })
  });
  return;
  it("userA should withdraw 10 MT", async function() {
return;
    const bal = await token.balanceOf(userA);
    // const dep = await token.deposits(userA);
    console.log("balance before withdrawal Request: "+web3.utils.fromWei(bal))
    // console.log("Deposits before withdrawal Request: "+web3.utils.fromWei(dep))

    const amount = web3.utils.toWei("10");
    let tx = await token.withdraw(amount, {from: userA})
    TruffleAssert.eventEmitted(tx, "Withdrawal", ev =>{
        id = ev.id.toString();
      return ev.withdrawer == userA && ev.amount.toString() == ""+amount;
    })
  });
  
  it("Bulk users should withdraw 10 MT", async function() {
// return;
    const amount = web3.utils.toWei("0.05");
    for (let j = 0; j < 100; j++) {
      for (let i = 1; i < 10; i++) {
     token.withdraw(amount, {from: accounts[i]})
      
    }
      
    }
    const ids = await token.pendingWithdrawals();
    console.log("withdrawId# "+ids.toString())
    // await token.withdraw(amount, {from: user9})
  });
 return;
  it("Admin should handle withdrawals", async function() {
    const ids = await token.pendingWithdrawals();
    console.log("withdrawId# "+ids.toString())
    let pendings
    // while (parseInt(pendings.toString()) == 0) {
    //   pendings = await token.pendingWithdrawals()
    // }
    pendings = await token.pendingWithdrawals();
    console.log("pendingWIthdrawals# "+pendings.toString())
    pendings = parseInt(pendings.toString());
    if (pendings == 0){
      console.log("No withdrawals found!!!")
      return;
    } 
    const batchSize = 50;
    let txs = pendings / batchSize
    let tx = []
    for (let j = 0; j < txs; j++) {
      tx.push(j);
    }
    let id;
    // tx.forEach(async (element) => {
    //   console.log("Loop# "+element);
    //   await token.handleWithdrawals(batchSize, {from: admin})
    //   id = await token.pendingWithdrawals();
    //   console.log("pendingWithdrawals# "+id.toString())
    // });
    let txx;
    for (let i = 0; i < tx.length; i++) {
      console.log("Loop# "+i);
      txx = await token.handleWithdrawals(batchSize, {from: admin})
      console.log(txx)
      id = await token.pendingWithdrawals();
      console.log("pendingWithdrawals# "+id.toString())
      
    }
    console.log("after forEach loop")
  });
  return;
  it("Admin should handle userA withdrawals", async function() {
    const amount = web3.utils.toWei("10");
    let amounts = [amount]
    let ids = [id]
    let withdrawers = [userA]

    let tx = await token.handleWithdrawals(ids, withdrawers, amounts, {from: admin})
   
    const bal = await token.balanceOf(userA);
    // const dep = await token.deposits(userA);
    console.log("balance after withdrawal Handled: "+web3.utils.fromWei(bal))
    
  });
  return;
  it("userB should not be able to withdraw MT (without deposit)", async function() {

    const amount = web3.utils.toWei("10");
    
    TruffleAssert.fails(
     token.withdraw(amount, {from: userB}),
      TruffleAssert.ErrorType.REVERT,
      "insufficient funds deposited"
    )
  });
  it("userB should deposit 20 MT", async function() {

    const balance = web3.utils.toWei("20");
    const amount = web3.utils.toWei("20");
    // transferring MT from admin to userB, so userB can be able to deposit later
    await token.transfer(userB,balance,{from: admin} )
    // depositing by userB
    let tx = await token.deposit(amount, {from: userB})
    TruffleAssert.eventEmitted(tx, "Deposit", ev =>{
      return ev.depositer == userB && ev.amount.toString() == ""+amount;
    })
  });
  it("userB should not be able to withdraw more than deposited MT", async function() {

    const amount = web3.utils.toWei("30");
    
    TruffleAssert.fails(
      token.withdraw(amount, {from: userB}),
      TruffleAssert.ErrorType.REVERT,
      "insufficient funds deposited"
    )
  });
  it("userB should withdraw 20 MT", async function() {
return;
    const amount = web3.utils.toWei("20");
    let tx = await token.withdraw(amount, {from: userB})
    TruffleAssert.eventEmitted(tx, "Withdrawal", ev =>{
      return ev.withdrawer == userB && ev.amount.toString() == ""+amount;
    })
  });
});
