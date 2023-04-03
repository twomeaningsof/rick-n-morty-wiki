import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AudioReactContext } from "../contexts";
import "../styles/globals.css";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  return (
    <>
      <Head>
        <title>Rick and Morty Wiki</title>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Mali:wght@400;500&display=swap'
          rel='stylesheet'
        />
      </Head>
      <ApolloProvider client={client}>
        <AudioReactContext.Provider value={{ isAudioEnabled, setIsAudioEnabled }}>
          <Component {...pageProps} />
        </AudioReactContext.Provider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
