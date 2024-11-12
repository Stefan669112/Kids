import { useMemo } from 'react'

const WalletType = window?.LeapElements?.WalletType;

export const useConnectedWalletType = (
  walletName: string | undefined,
  isWalletConnected: boolean
) => {
  const connectedWallet = useMemo(() => {
    if (!isWalletConnected || !WalletType) {
      return undefined
    }
    switch (walletName) {
      case 'leap-extension':
        return WalletType.LEAP
      case 'keplr-extension':
        return WalletType.KEPLR
      case 'leap-cosmos-mobile':
        return WalletType.WC_LEAP_MOBILE
      case 'keplr-cosmos-mobile':
        return WalletType.WC_KEPLR_MOBILE
      case 'leap-metamask-cosmos-snap':
        return WalletType.METAMASK_SNAP_LEAP
      default:
        return undefined
    }
  }, [isWalletConnected, walletName])

  return connectedWallet
}