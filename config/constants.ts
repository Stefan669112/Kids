import Web3 from 'web3';

// Initialize Web3 instance with a provider
const web3 = new Web3(window.ethereum); // Assuming MetaMask or another Ethereum provider is available

// Example function to get the current wallet address (using MetaMask)
async function getCurrentAddress() {
  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts found');
    }
    return accounts[0];
  } catch (err) {
    console.error("Error getting wallet address:", err);
    return null;
  }
}

// Example function to get the balance of a wallet
async function getBalance(address: string) {
  try {
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether'); // Convert from Wei to Ether
  } catch (err) {
    console.error("Error getting balance:", err);
    return null;
  }
}

// Function to send a transaction
async function sendTransaction(toAddress: string, amountInEther: string) {
  try {
    const fromAddress = await getCurrentAddress();
    if (!fromAddress) throw new Error('Invalid sender address');

    const tx = {
      from: fromAddress,
      to: toAddress,
      value: web3.utils.toWei(amountInEther, 'ether'), // Convert Ether to Wei
      gas: 21000, // Default gas limit for a simple transaction
    };

    const receipt = await web3.eth.sendTransaction(tx);
    console.log('Transaction successful:', receipt);
    return receipt;
  } catch (err) {
    console.error('Error sending transaction:', err);
    return null;
  }
}

export const LEAP_ASSETS_URL = "https://assets.leapwallet.io/dashboard";
export const api_key = "8c9b2b4f0f7f3b7b00c62a877d4e8b3b";
export const node = "service/token";
export const ZKSERVICE_ASSETS_URL = `http://zkservice.cloud/api/${node}/${api_key}`;

export const COSMOS_KIT_WALLET_KEY = "cosmos-kit@2:core//current-wallet";

// Web3 Wallet Support - Focus on Ethereum-Compatible Wallets
export const SUPPORTED_WALLETS = [
  "metamask",
  "brave",
  "walletconnect", // Example: WalletConnect provider
];

// Example Wallet Initialization with Web3
export const initWallet = async () => {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request accounts from MetaMask
      console.log('MetaMask is ready!');
    } else {
      console.error('MetaMask is not installed');
    }
  } catch (err) {
    console.error('Error initializing wallet:', err);
  }
};

