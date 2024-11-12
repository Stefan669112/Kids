import { useState, useEffect } from 'react';
import Web3 from 'web3';

// Define the props for NFTList
interface NFTListProps {
  setIsElementsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collection: string | undefined;
}

export const NFTList: React.FC<NFTListProps> = ({ setIsElementsModalOpen, collection }) => {
  const [account, setAccount] = useState<string>('');
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const web3Instance = new Web3(window.ethereum as any);  // Cast window.ethereum to `any`
      setWeb3(web3Instance);

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => {
          setAccount(accounts[0]);
        })
        .catch((err: Error) => {
          console.error('Failed to connect to wallet:', err);
        });
    } else {
      console.log('Ethereum wallet (like MetaMask) is not installed');
    }
  }, []);

  const getNFTs = async () => {
    if (!web3 || !account) return;
    // Logic to fetch NFTs
  };

  return (
    <div>
      <h2>Your NFTs</h2>
      {account ? (
        <div>Connected Account: {account}</div>
      ) : (
        <button onClick={() => getNFTs()}>Connect Wallet</button>
      )}
      {/* Display NFTs */}
    </div>
  );
};
