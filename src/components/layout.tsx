import React from 'react';
import { useAuth, useMe } from '../lib/auth';

const Layout: React.FC = ({ children }) => {
  const { isAuth } = useAuth();
  const { data } = useMe();

  return (
    <div>
      {isAuth && <h1>Logeado: {data.me.username}</h1>}
      {children}
    </div>
  );
};

export default Layout;
