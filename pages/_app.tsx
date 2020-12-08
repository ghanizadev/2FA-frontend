import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../redux/store";

import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mobile authenticator example</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
