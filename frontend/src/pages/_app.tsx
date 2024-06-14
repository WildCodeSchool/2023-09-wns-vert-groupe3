import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import { UserDatesResearchProvider } from "contexts/UserDatesResearchContext";

import Layout from "components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <ApolloProvider client={client}>
      <Layout>
        <UserDatesResearchProvider>
          <Component {...pageProps} />
        </UserDatesResearchProvider>
        <ToastContainer />
      </Layout>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
