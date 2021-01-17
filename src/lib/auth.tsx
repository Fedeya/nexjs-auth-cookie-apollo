import {
  gql,
  ApolloClient,
  NormalizedCacheObject,
  useQuery
} from '@apollo/client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import { initializeApollo, addApolloState } from './apollo';

const meQuery = gql`
  query {
    me {
      id
      email
      username
    }
  }
`;

type authFunction = (
  ctx: GetServerSidePropsContext,
  client: ApolloClient<NormalizedCacheObject>
) => GetServerSidePropsResult<any>;

export function ensureAuth(gssr?: authFunction) {
  const hoc: GetServerSideProps = async ctx => {
    const client = initializeApollo();

    try {
      await client.query({
        query: meQuery,
        context: {
          headers: ctx.req.headers
        }
      });
    } catch (err) {
      return {
        props: {
          auth: false
        },
        redirect: {
          destination: '/login'
        }
      };
    }

    if (gssr) gssr(ctx, client);

    return addApolloState(client, {
      props: {
        auth: true
      }
    });
  };

  return hoc;
}

export type AuthContextValue = {
  isAuth: boolean;
};

const AuthContext = createContext<AuthContextValue>(undefined);

type AuthProviderProps = {
  auth?: boolean;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  auth,
  children
}) => {
  const [isAuth, setIsAuth] = useState(auth ?? false);

  useEffect(() => {
    setIsAuth(auth);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        isAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("the component don't wrapped by AuthProvider");
  }
  return ctx;
}

export const useMe = () => {
  return useQuery(meQuery);
};
