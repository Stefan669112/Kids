import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PiXBold } from "react-icons/pi";
import Web3 from "web3";
import { isMobile } from "react-device-detect";  // Importing isMobile

interface HeaderProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setShowModal }: HeaderProps) => {
  const [isClient, setIsClient] = useState(false);
  const [account, setAccount] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    setIsClient(true);
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum as any);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }
  };

  const handleConnect = async () => {
    if (typeof window.ethereum === "undefined") {
      // Show modal to install MetaMask
      setShowModal(true);
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setAccount("");
  };

  if (!isClient) return null;

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Bad Kids Shop</h1>
      </div>

      <div className="flex items-center gap-4">
        {isMobile ? (
          // Render this content if the user is on mobile
          <div className="text-sm text-gray-500">
            You are using a mobile device.
          </div>
        ) : (
          <>
            {/* Desktop Wallet Connect/Disconnect */}
            {!account ? (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
                <button
                  onClick={handleDisconnect}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <PiXBold size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
