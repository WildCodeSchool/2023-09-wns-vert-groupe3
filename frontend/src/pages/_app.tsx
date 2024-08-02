import {
   ApolloClient,
   ApolloProvider,
   InMemoryCache,
   createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Layout from "components/Layout";
import { CartProvider } from "contexts/CartContext";
import { UserDatesResearchProvider } from "contexts/UserDatesResearchContext";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";

const httpLink = createHttpLink({
   uri: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
   // get the authentication token from local storage if it exists
   const token = localStorage.getItem("jwt");
   // return the headers to the context so httpLink can read them

   const timeoutToken = 24 * 60 * 60 * 1000
   setTimeout(() => {
      localStorage.removeItem("jwt");
      console.log("Token supprimé du local storage après 24 heures");
   }, (timeoutToken));

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

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
   return (
      <ApolloProvider client={client}>
         <CartProvider>
            <Layout>
               <UserDatesResearchProvider>
                  <Component {...pageProps} />
               </UserDatesResearchProvider>
               <ToastContainer />
            </Layout>
         </CartProvider>
      </ApolloProvider>
   );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
