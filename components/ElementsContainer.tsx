import { LiquidityModal } from "@leapwallet/elements";

import { useChain } from "@cosmos-kit/react";
import "@leapwallet/elements/styles.css";
import { useElementsWalletClient } from "../config/walletclient";
import Image from "next/image";
import Text from "./Text";
import StargazeLogo from "../public/stargaze-logo.svg";
import { useEffect } from "react";

export const renderLiquidityButton = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      id="open-liquidity-modal-btn"
      className="flex gap-2 items-center justify-between border border-white-100 rounded-3xl px-5 py-2"
    >
      <Image src={StargazeLogo} height={16} width={16} alt="get stars" />
      <Text size="sm" color="text-white-100 font-bold">
        Get Stars
      </Text>
    </button>
  );
};

interface Props {
  icon?: string;
  title?: string;
  subtitle?: string;
  customRenderLiquidityButton?: ({ onClick }: any) => JSX.Element;
}

export function ElementsContainer({
  icon = "https://assets.leapwallet.io/stars.png",
  title = "Buy Bad Kid #44",
  subtitle = "Price: 42K STARS",
  customRenderLiquidityButton,
}: Props) {
  const { address, openView } = useChain("stargaze");
  const walletClient = useElementsWalletClient();
  useEffect(() => {
    const elementsModal = document.querySelector(".leap-elements");
    if (elementsModal) {
      //@ts-ignore
      elementsModal.style["zIndex"] = 0;
    }
  }, []);
  return (
    <div className="z-0">
      <LiquidityModal
        renderLiquidityButton={
          customRenderLiquidityButton ?? renderLiquidityButton
        }
        theme="dark"
        walletClientConfig={{
          userAddress: address,
          walletClient: walletClient,
          connectWallet: async () => {
            openView();
          },
        }}
        config={{
          icon: icon,
          title,
          subtitle,
          tabsConfig: {
            "cross-chain-swaps": {
              title: "Bridge from Ethereum",
              defaults: {
                destinationChainId: "stargaze-1",
                destinationAssetSelector: ["denom", "ustars"],
              },
            },
            swap: {
              title: "Bridge from Cosmos",
              defaults: {
                sourceChainId: "osmosis-1",
                sourceAssetSelector: ["denom", "uosmo"],
                destinationChainId: "stargaze-1",
              },
            },
            "fiat-on-ramp": {
              defaults: {
                destinationAssetSelector: ["denom", "ustars"],
                destinationChainId: "stargaze-1",
              },
            },
            transfer: {
              enabled: false,
            },
            "bridge-usdc": {
              enabled: false,
            },
          },
        }}
      />
    </div>
  );
}
