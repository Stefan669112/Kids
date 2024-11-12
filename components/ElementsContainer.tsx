declare module '@leapwallet/elements-umd-types' {
  // Define the shape of LeapElements as expected in the context
  interface mountElementsArgs {
    element: {
      name: string;
      props: {
        title: string;
        sourceHeader: string;
        destinationHeader: string;
        showPoweredByBanner: boolean;
      };
    };
    elementsRoot: string;
    connectedWalletType: string | null;
    connectWallet: () => void;
  }

  interface LeapElements {
    mountElements: (args: mountElementsArgs) => void;
    WalletType: any; // You can define this type more specifically if needed
  }

  // This makes LeapElements available on the Window object
  interface Window {
    LeapElements?: LeapElements;
  }
}



import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Web3 from "web3";
import { PiXBold } from "react-icons/pi";
import '@leapwallet/elements-umd-types';

export const renderLiquidityButton = ({ onClick }: any) => {
  return <button onClick={onClick} id="open-liquidity-modal-btn"></button>;
};

const Modal = ({ show, onClose, children = null }: {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div id="swap-modal" className="swap-modal-backdrop leap-ui dark" style={{ display: show ? 'flex' : 'none' }}>
      <div className="modal-container">
        <button className="swap-modal-close-button bg-background p-2 rounded-full border shadow" onClick={onClose}>
          <PiXBold />
        </button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ElementsContainer({ isOpen, setIsOpen }: Props) {
  const [account, setAccount] = useState<string | null>(null);
  const [isElementsReady, setIsElementsReady] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed. Please install it to use this feature.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Failed to connect MetaMask:", error);
    }
  };

  useEffect(() => {
    if (window.LeapElements && isElementsReady) {
      window.LeapElements.mountElements({
        element: {
          name: "aggregated-swaps",
          props: {
            title: "Get Tokens",
            sourceHeader: "From",
            destinationHeader: "To",
            showPoweredByBanner: true,
          },
        },
        elementsRoot: "#swap-modal>.modal-container>.modal-body",
        connectedWalletType: account ? "metamask" : null,
        connectWallet,
      });
    }
  }, [account, isElementsReady]);

  useEffect(() => {
    if (!window) {
      return;
    }

    if (window.LeapElements) {
      setIsElementsReady(true);
      return;
    }

    const cb = () => {
      setIsElementsReady(true);
    };

    window.addEventListener("@leapwallet/elements:load", cb);

    return () => {
      window.removeEventListener("@leapwallet/elements:load", cb);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <Modal show={isOpen} onClose={() => setIsOpen(false)}>
      {!account ? (
        <button onClick={connectWallet} className="connect-wallet-button">
          Connect MetaMask
        </button>
      ) : (
        <div>Connected: {account.slice(0, 6)}...{account.slice(-4)}</div>
      )}
    </Modal>
  );
}
