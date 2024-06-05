import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserDatesResearchProvider } from "contexts/UserDatesResearchContext";

import Layout from "components/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "styles/globals.css";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// const client = new ApolloClient({
//   uri: "process.env.NEXT_PUBLIC_BACKEND_URL",
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          <UserDatesResearchProvider>
            <Component {...pageProps} />
          </UserDatesResearchProvider>
          <ToastContainer />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
