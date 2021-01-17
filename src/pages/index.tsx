import React from 'react';
import Layout from '../components/layout';
import { ensureAuth } from '../lib/auth';

const Home: React.FC = () => (
  <Layout>
    <h1>Hello World</h1>
  </Layout>
);

export const getServerSideProps = ensureAuth();

export default Home;
