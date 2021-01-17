import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import { AuthProvider } from '../lib/auth';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <AuthProvider auth={pageProps.auth}>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
