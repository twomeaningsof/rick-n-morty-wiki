import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Head from "next/head";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Rick and Morty Wiki</title>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
      <link href='https://fonts.googleapis.com/css2?family=Mali&display=swap' rel='stylesheet' />
    </Head>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </>
);

export default MyApp;
