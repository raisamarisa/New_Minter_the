import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { client } from '../utils/providerweb3';
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
// import { ApolloProvider } from '@apollo/react-hooks';
import Script from 'next/script'

import store from '../store/store'
import { Provider } from 'react-redux';
import Layout from "../Layout/layout"
import toast, { Toaster } from 'react-hot-toast';

// <Script disable-devtool-auto src="https://cdn.jsdelivr.net/npm/disable-devtool" />
export default function App({ Component, pageProps }: AppProps) {
  return   (
    <>
      <Toaster/>
    <WagmiConfig client={client}>
          <ConnectKitProvider>
    <Provider store={store}>
    <Layout>
    <Component {...pageProps} />


    </Layout>    
 

    </Provider>
    </ConnectKitProvider>
    </WagmiConfig>
    </>
  
 )
}

