import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

// Global window type declaration for ethereum
declare global {
  interface Window {
    ethereum?: any; // Using 'any' for ethereum to avoid conflicts in types
  }
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://your-graphql-endpoint",  // Replace this with your actual GraphQL endpoint
  cache: new InMemoryCache(),  // In-memory cache for Apollo Client
});

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>Bad Kids Shop</title>
      </Head>
      {/* ApolloProvider wraps the application to make Apollo Client available throughout the app */}
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
