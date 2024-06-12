import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { UserDatesResearchProvider } from "contexts/UserDatesResearchContext";
import Layout from "components/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "styles/globals.css";
import { setContext } from "@apollo/client/link/context";


const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
   // get the authentication token from local storage if it exists
   const token = localStorage.getItem("jwt");
   // return the headers to the context so httpLink can read them
   return {
     headers: {
       ...headers,
       authorization: token ? `Bearer ${token}` : "",
     },
   };
 });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
