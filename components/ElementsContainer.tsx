import { useEffect, useState } from "react";
import Web3 from "web3";
import Image from "next/image";
import Text from "./Text";
import StargazeLogo from "../public/stargaze-logo.svg";

// This is the render function for the button that will open MetaMask
export const renderLiquidityButton = ({ onClick }: any) => {
  return <button onClick={onClick} id="open-liquidity-modal-btn">Connect MetaMask</button>;
};

interface Props {
  icon?: string;
  title?: string;
  subtitle?: string;
  customRenderLiquidityButton?: ({ onClick }: any) => JSX.Element;
  isOpen: boolean;            // Added isOpen prop
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Added setIsOpen prop
}

export function ElementsContainer({
  icon = "https://assets.leapwallet.io/stars.png",
  title = "Buy Bad Kid #44",
  subtitle = "Price: 42K STARS",
  customRenderLiquidityButton,
  isOpen,
  setIsOpen,
}: Props) {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Check if MetaMask (window.ethereum) is available
    if (typeof window.ethereum !== "undefined") {
      const newWeb3 = new Web3(window.ethereum);
      setWeb3(newWeb3);
    }
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {
        // Request account access using MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    }
  };

  return (
    <div className="z-99">
      {isOpen && (
        <div>
          {/* Modal content */}
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <button onClick={connectWallet}>Connect MetaMask</button>
          {isConnected && <p>Wallet Connected: {userAddress}</p>}
        </div>
      )}
    </div>
  );
}
