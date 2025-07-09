# Simple Token DApp - Assignment 2

## 📋 Project Overview

This project implements a decentralized application (DApp) for token transfers on the Ethereum blockchain. The DApp consists of an ERC-20 compatible smart contract and a web-based frontend that allows users to interact with the contract through MetaMask.

## 🚀 Live Deployment

- **Contract Address:** `0x9792`
- **Network:** Sepolia Testnet
- **Etherscan:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x9Bc9792)

## 🏗️ Project Structure

```
Formative2_token-dapp/
├── contracts/
│   ├── Migrations.sol
│   └── SimpleToken.sol          # Main ERC-20 token contract
├── migrations/
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js    # Deployment script
├── test/
│   └── SimpleToken.test.js      # Comprehensive test suite
├── public/
│   └── index.html              # Frontend DApp interface
├── truffle-config.js           # Truffle configuration
├── package.json               # Dependencies
└── .env                       # Environment variables (not committed)
```

## 🛠️ Technologies Used

- **Smart Contract:** Solidity ^0.8.0
- **Development Framework:** Truffle Suite
- **Blockchain:** Ethereum (Sepolia Testnet)
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Web3 Integration:** Web3.js v1.7.4
- **Wallet Integration:** MetaMask
- **Testing:** Truffle Test Suite with Mocha/Chai

## 💡 Smart Contract Features

### SimpleToken.sol
- **Token Name:** SimpleToken
- **Symbol:** SIM
- **Decimals:** 18
- **Initial Supply:** 1,000,000 SIM tokens
- **ERC-20 Compatible Functions:**
  - `transfer(address _to, uint256 _value)` - Transfer tokens
  - `balanceOf(address _owner)` - Check token balance
  - `approve(address _spender, uint256 _value)` - Approve spending
  - `transferFrom(address _from, address _to, uint256 _value)` - Transfer on behalf
  - `allowance(address _owner, address _spender)` - Check allowance

### Security Features
- Zero address validation
- Insufficient balance protection
- Allowance verification for transferFrom
- Event emission for transparency

## 🎯 Frontend Features

### User Interface
- **Wallet Connection:** One-click MetaMask integration
- **Balance Display:** Real-time token balance updates
- **Network Detection:** Automatic network identification
- **Token Transfer:** Intuitive transfer interface
- **Transaction Status:** Real-time transaction feedback
- **Responsive Design:** Mobile and desktop compatible

### Web3 Integration
- Automatic MetaMask detection
- Account change handling
- Network change detection
- Transaction error handling
- Gas estimation and optimization

## 🧪 Testing

### Test Coverage
The smart contract includes comprehensive tests covering:

1. **Token Properties**
   - Correct name, symbol, decimals
   - Total supply verification
   - Initial balance assignment

2. **Token Transfers**
   - Successful transfers
   - Insufficient balance handling
   - Zero address protection

3. **Token Allowances**
   - Approval functionality
   - TransferFrom mechanism
   - Allowance updates

### Running Tests
```bash
# Install dependencies
npm install

# Compile contracts
truffle compile

# Run test suite
truffle test
```

### Test Results
```
Contract: SimpleToken
  Token Properties
    ✓ should have correct name
    ✓ should have correct symbol
    ✓ should have correct decimals
    ✓ should have correct total supply
    ✓ should assign total supply to owner
  Token Transfers
    ✓ should transfer tokens correctly
    ✓ should fail when transferring more than balance
    ✓ should fail when transferring to zero address
  Token Allowances
    ✓ should approve allowance correctly
    ✓ should transfer from allowance correctly

10 passing (1s)
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js v14+ and npm
- MetaMask browser extension
- Sepolia testnet ETH

### Installation
1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd Formative2_token-dapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install -g truffle
   npm install dotenv @truffle/hdwallet-provider web3
   ```

3. **Configure environment**
   ```bash
   # Create .env file
   echo "MNEMONIC=your_metamask_seed_phrase" > .env
   echo "INFURA_PROJECT_ID=your_infura_project_id" >> .env
   ```

4. **Compile contracts**
   ```bash
   truffle compile
   ```

5. **Run tests**
   ```bash
   truffle test
   ```

6. **Deploy to testnet (optional)**
   ```bash
   truffle migrate --network sepolia
   ```

## 🌐 Using the DApp

### Step 1: Setup MetaMask
1. Install MetaMask browser extension
2. Switch to Sepolia Test Network
3. Get Sepolia ETH from a faucet:
   - [Sepolia Faucet](https://sepoliafaucet.com/)
   - [Infura Faucet](https://www.infura.io/faucet/sepolia)

### Step 2: Access the DApp
1. Open `public/index.html` in your browser
2. Click "Connect Wallet"
3. Approve MetaMask connection

### Step 3: Transfer Tokens
1. Enter recipient address
2. Specify transfer amount
3. Click "Transfer Tokens"
4. Confirm transaction in MetaMask
5. Monitor transaction status

## 📱 Demo & Screenshots

### Frontend Interface
![DApp Interface](screenshots/dapp-interface.png)

### MetaMask Integration
![MetaMask Connection](screenshots/metamask-connection.png)

### Token Transfer
![Token Transfer](screenshots/token-transfer.png)

### Transaction Success
![Transaction Success](screenshots/transaction-success.png)

## 🔗 Deployment Details

### Contract Deployment
- **Deployer Address:** [Your wallet address]
- **Deployment Transaction:** [Transaction hash from Remix]
- **Gas Used:** ~500,000 gas
- **Deployment Cost:** ~0.01 ETH

### Verification
The contract can be verified on Etherscan:
1. Visit the contract address on Sepolia Etherscan
2. View contract code and transactions
3. Interact with contract functions directly

## 🎥 Demo Video

A comprehensive demo video showing:
- Smart contract deployment process
- Frontend functionality demonstration
- Token transfer execution
- Transaction verification on Etherscan

[Link to demo video - Upload to YouTube/Vimeo]

## 🔐 Security Considerations

### Smart Contract Security
- Input validation for all parameters
- Reentrancy protection through proper state updates
- Overflow protection (Solidity ^0.8.0 built-in)
- Event logging for transparency

### Frontend Security
- Input sanitization and validation
- Error handling for all Web3 operations
- Network verification before transactions
- User confirmation for all operations

## 🚀 Future Improvements

### Potential Enhancements
- **Multi-token Support:** Support for multiple ERC-20 tokens
- **Advanced Features:** Staking, burning, minting capabilities
- **Enhanced UI:** React/Vue.js framework migration
- **Mobile App:** Native mobile application
- **DeFi Integration:** DEX connectivity and liquidity pools

### Scalability
- **Layer 2 Integration:** Polygon, Arbitrum support
- **Gas Optimization:** Contract optimization for lower fees
- **Batch Operations:** Multiple transfers in single transaction

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**[Joshua Alana]**

## 🙏 Acknowledgments

- **Truffle Suite** - Development framework
- **OpenZeppelin** - Smart contract patterns
- **MetaMask** - Wallet integration
- **Infura** - Ethereum node provider
- **Remix IDE** - Contract deployment
