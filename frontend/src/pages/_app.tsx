import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from "@apollo/client";
  import { setContext } from "@apollo/client/link/context";
  import Layout from "../app/layout";
  import "@/styles/globals.css";
  import type { AppProps } from "next/app";
  import dynamic from "next/dynamic";
  import "react-toastify/dist/ReactToastify.css";
  
  const httpLink = createHttpLink({
    uri: "http://backend:4000",
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
  
  function App({ Component, pageProps }: AppProps) {
    return (
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }