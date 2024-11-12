import WalletIcon from "../public/account_balance_wallet.svg";
import { useEffect, useState } from "react";
import Image from "next/image";
import Text from "./Text";
import { IoMdCloseCircle } from "react-icons/io";
import Web3 from "web3";

interface WalletButtonOptions { 
  openEmbeddedWalletModal: Function 
}

export function WalletButton({ openEmbeddedWalletModal }: WalletButtonOptions) {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [status, setStatus] = useState<"Connected" | "Disconnected" | "Connecting">("Disconnected");

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (!web3) return;
    try {
      setStatus("Connecting");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setAddress(accounts[0]);
      const balanceInWei = await web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei(balanceInWei, "ether"));
      setStatus("Connected");
    } catch (error) {
      setStatus("Disconnected");
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setBalance(null);
    setStatus("Disconnected");
  };

  let text = "Connect Wallet";
  if (status === "Connected") {
    text = sliceAddress(address ?? "");
  } else if (status === "Connecting") {
    text = "Connecting...";
  }

  return (
    <div className="flex items-center gap-2 h-10 justify-between border bg-white-100 border-white-100 rounded-3xl px-5 py-2">
      <button
        onClick={() => { 
          if (status === "Connected") { 
            openEmbeddedWalletModal();
          } else {
            connectWallet();
          }
        }}
        disabled={status === "Connecting"}
        className="flex items-center gap-2 justify-between "
      >
        <Image
          color="#000"
          src={WalletIcon}
          alt="wallet"
          style={{
            filter: "invert(1)",
          }}
          height={16}
          width={16}
        />
        <div className="flex flex-col items-center gap-0 justify-center">
          {status === "Connected" && (
            <Text
              size="sm"
              color="text-black-100 font-bold"
              className="m-0 p-0"
            >
              {balance} ETH
            </Text>
          )}
          <Text
            size={status === "Connected" ? "xs" : "sm"}
            color={
              status === "Connected"
                ? "text-black-100 "
                : "text-black-100 font-bold"
            }
            className={status === "Connected" ? "mt-[-6px] p-0" : "mt-0 p-0"}
          >
            {text}
          </Text>
        </div>
      </button>
      {status === "Connected" && (
        <button onClick={disconnectWallet}>
          <span title="Disconnect Wallet">
            <IoMdCloseCircle size={16} title="Disconnect Wallet" />
          </span>
        </button>
      )}
    </div>
  );
}
