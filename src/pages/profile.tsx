import React from 'react';
import { useMe, ensureAuth } from '../lib/auth';
import Layout from '../components/layout';

const Me: React.FC = () => {
  const { data } = useMe();

  return (
    <Layout>
      <div>
        <p>{data?.me.id}</p>
        <p>{data?.me.email}</p>
        <p>{data?.me.username}</p>
        <h1>Hello World</h1>
      </div>
    </Layout>
  );
};

export const getServerSideProps = ensureAuth();

export default Me;
