import { WagmiConfig, createClient, mainnet } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { bsc,bscTestnet,goerli ,arbitrum} from "wagmi/chains";
import { ethers } from "ethers";


const RPC_URL = 'https://data-seed-prebsc-1-s2.binance.org:8545';
const VALIDATION_SIGNER = process.env.VALIDATION_SIGNER || "0xa8deb5f4415b91ae95a717f21a3d4ca9601e86f75e10f24451738d8e99822d5e"; // set the private key here
export const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
export const validationSigner = new ethers.Wallet(VALIDATION_SIGNER, provider);
// https://data-seed-prebsc-1-s2.binance.org:8545
//const RPC_URL = 'https://eth-mainnet.g.alchemy.com/v2/9OFEz-mV6cQwYRPXIi75IW-NuOiKdtVU';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)

const alchemyId = "Tv277_RjwkXDuii_WGiG_X8RL-T56yyG";
//  up client
//
const chains = [bscTestnet];

export const client = createClient(
  getDefaultClient({
    appName: "minter",
    alchemyId,
    chains
  }),
  );

// Pass client to React Context Provider