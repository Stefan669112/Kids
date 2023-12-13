import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChainProvider } from '@cosmos-kit/react';
import { ChakraProvider } from '@chakra-ui/react';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation';
import { wallets as leapWallets } from '@cosmos-kit/leap';

import { SignerOptions } from '@cosmos-kit/core';
import { chains, assets } from 'chain-registry';
import { defaultTheme } from '../config';
import '@interchain-ui/react/styles';
import { Provider as GraphqlProvider} from 'urql'
import { client } from '../config/urqlclient';


const updatedChains = chains.map((chain) => {
      if (chain.chain_id === 'stargaze-1') {
        return {
          ...chain,
          apis: {
            ...chain.apis,
            rest: [{address: 'https://leap-node-proxy.numia.xyz/stargaze-lcd'}].concat(chain.apis?.rest ?? []),
            rpc: [{address: 'https://leap-node-proxy.numia.xyz/stargaze-rpc'}].concat(chain.apis?.rpc ?? []),
          },
        };
      }

      return chain;
    });

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };


  

  return (
  <GraphqlProvider value={client}>

      <ChainProvider
        chains={updatedChains}
        assetLists={assets}
        wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]}
        walletConnectOptions={{
          signClient: {
            projectId: 'a8510432ebb71e6948cfd6cde54b70f7',
            relayUrl: 'wss://relay.walletconnect.org',
            metadata: {
              name: 'CosmosKit Template',
              description: 'CosmosKit dapp template',
              url: 'https://docs.cosmoskit.com/',
              icons: [],
            },
          },
        }}
        signerOptions={signerOptions}
      >
        <Component {...pageProps} />
      </ChainProvider>
      </GraphqlProvider>

  );
}

export default CreateCosmosApp;