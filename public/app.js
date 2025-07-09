// Contract ABI and Address (replace with your deployed contract details)
const CONTRACT_ABI = [
    {
        "inputs": [{"internalType": "uint256", "name": "_initialSupply", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
            {"indexed": true, "internalType": "address", "name": "spender", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
            {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "_spender", "type": "address"},
            {"internalType": "uint256", "name": "_value", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "_to", "type": "address"},
            {"internalType": "uint256", "name": "_value", "type": "uint256"}
        ],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "_from", "type": "address"},
            {"internalType": "address", "name": "_to", "type": "address"},
            {"internalType": "uint256", "name": "_value", "type": "uint256"}
        ],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x..."; // Update this after deployment

let web3;
let contract;
let currentAccount;

// DOM elements
const connectWalletBtn = document.getElementById('connectWallet');
const walletAddress = document.getElementById('walletAddress');
const tokenBalance = document.getElementById('tokenBalance');
const transferForm = document.getElementById('transferForm');
const statusMessage = document.getElementById('statusMessage');

// Initialize the DApp
async function init() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        // Check if already connected
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            currentAccount = accounts[0];
            updateUI();
        }
    } else {
        showStatus('Please install MetaMask to use this DApp', 'error');
    }
}

// Connect wallet
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        currentAccount = accounts[0];
        updateUI();
        showStatus('Wallet connected successfully!', 'success');
    } catch (error) {
        showStatus('Failed to connect wallet: ' + error.message, 'error');
    }
}

// Update UI with wallet information
async function updateUI() {
    if (currentAccount) {
        walletAddress.textContent = currentAccount;
        connectWalletBtn.textContent = 'Connected';
        connectWalletBtn.disabled = true;
        
        // Get token balance
        try {
            const balance = await contract.methods.balanceOf(currentAccount).call();
            const balanceInTokens = web3.utils.fromWei(balance, 'ether');
            tokenBalance.textContent = parseFloat(balanceInTokens).toFixed(2);
        } catch (error) {
            console.error('Error fetching balance:', error);
            tokenBalance.textContent = 'Error';
        }
    }
}

// Transfer tokens
async function transferTokens(event) {
    event.preventDefault();
    
    const recipientAddress = document.getElementById('recipientAddress').value;
    const amount = document.getElementById('transferAmount').value;
    
    if (!currentAccount) {
        showStatus('Please connect your wallet first', 'error');
        return;
    }
    
    if (!recipientAddress || !amount) {
        showStatus('Please fill in all fields', 'error');
        return;
    }
    
    try {
        showStatus('Transaction in progress...', 'loading');
        
        const amountInWei = web3.utils.toWei(amount, 'ether');
        
        const result = await contract.methods.transfer(recipientAddress, amountInWei).send({
            from: currentAccount
        });
        
        showStatus(`Transaction successful! Hash: ${result.transactionHash}`, 'success');
        
        // Update balance
        updateUI();
        
        // Clear form
        document.getElementById('transferForm').reset();
        
    } catch (error) {
        showStatus('Transaction failed: ' + error.message, 'error');
    }
}

// Show status message
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = type;
}

// Event listeners
connectWalletBtn.addEventListener('click', connectWallet);
transferForm.addEventListener('submit', transferTokens);

// Listen for account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
        if (accounts.length > 0) {
            currentAccount = accounts[0];
            updateUI();
        } else {
            currentAccount = null;
            walletAddress.textContent = 'Not connected';
            tokenBalance.textContent = '0';
            connectWalletBtn.textContent = 'Connect Wallet';
            connectWalletBtn.disabled = false;
        }
    });
}

// Initialize on page load
init();
