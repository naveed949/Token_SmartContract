// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

/// @title Token - ERC20 Token
/// @author Naveed
/// @notice This is an ERC20 token, allowing users to deposit & withdraw tokens.
/// @dev Except standard ERC20 token's features, this smartcontract has two additional features through which
//       token holders can deposit their tokens to admin and can their deposited tokens. 
contract Token is ERC20 {
  using SafeMath for uint256;
  /// @notice account which handle users withdrawal requests
  address public admin;
  /// @notice count to track pending withdrawals
  uint256 public pendingWithdrawals;

  /// @notice mapping to track users deposits
  /// @dev depositer address => total amount depositer has deposited
  mapping (address => uint256) public deposits;

  /// @notice mapping to track users withdraw requests
  /// @dev withdrawId => Withdraw struct
  mapping (uint256 => Withdraw) public withdraws;

  /// @dev struct being used in above withdraws mapping, to manage Withdrawer information
  struct Withdraw {
    address withdrawer;
    uint256 amount;
  }

  /// @dev constructor to initialize Token contract.
  /// @param name_ name of ERC20 token
  /// @param symbol_ symbol of token
  /// @param supply_ total supply of token
  constructor(string memory name_, string memory symbol_, uint256 supply_) ERC20(name_, symbol_) {
    _mint(msg.sender, supply_);
    admin = msg.sender;
  }

  /// @notice this function is to let token holder deposit his tokens to admin wallet/account.
  /// @dev token holders can deposit as much tokens as he wants in more than one transactions. Total deposit amount gets updated each time.
  /// @param amount amount of the tokens depositer want to deposit.
  function deposit(uint256 amount) public {
    // escrowing tokens by transferring to admin wallet
    transfer(admin, amount);
    deposits[msg.sender] = deposits[msg.sender].add(amount);
    emit Deposit(msg.sender, amount);
  }

  /// @notice this function is to let token holder withdraw his tokens from admin wallet/account.
  /// @dev token holders can withdraw as much tokens as he wants in more than one transactions.
  /// @param amount amount of the tokens withdrawer want to withdraw
  /// **** condition: withdrawer must have deposited enought tokens first.
  function withdraw(uint256 amount) public {
    require(deposits[msg.sender] >= amount, "insufficient funds deposited");
    // _transfer(admin, msg.sender, amount);
    deposits[msg.sender] = deposits[msg.sender].sub(amount);
    pendingWithdrawals = pendingWithdrawals.add(1);
    withdraws[pendingWithdrawals] = Withdraw(msg.sender,amount);
    
    emit Withdrawal(pendingWithdrawals, msg.sender, amount);
  }

  /// @notice this function is to let admin handle withdraw requests of withdrawers by sending them back their deposited amount as per their withdraw request.
  /// @dev only admin can trigger this function.
  /// @param batchSize number of withdraws to process
  /// **** condition: withdraws must be requested first by users/withdrawers.
  function handleWithdrawals(uint256 batchSize) onlyAdmin public {
    require(pendingWithdrawals > 0, "no withdrawals requested");
    uint256 from = pendingWithdrawals;

    for (uint256 i = 0; i < batchSize; i++) {
        _transfer(admin, withdraws[pendingWithdrawals].withdrawer, withdraws[pendingWithdrawals].amount);
        delete withdraws[pendingWithdrawals];
        pendingWithdrawals = pendingWithdrawals.sub(1);
        if (pendingWithdrawals == 0){
          break;
        }
    }
    emit WithdrawalHandled(from, pendingWithdrawals, batchSize);
  }
/// @dev modifier to ensure caller is admin
  modifier onlyAdmin() {
    require(msg.sender == admin, "unauthorized: caller not admin");
    _;
  }

  // Events
  event Deposit(address indexed depositer, uint256 amount);
  event Withdrawal(uint256 indexed id, address indexed withdrawer, uint256 amount);
  event WithdrawalHandled(uint256 from, uint256 to, uint256 batchSize);
}
