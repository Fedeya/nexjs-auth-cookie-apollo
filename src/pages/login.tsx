import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const [login] = useMutation(gql`
    mutation($input: AuthInput!) {
      login(input: $input) {
        token
      }
    }
  `);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await login({
      variables: {
        input: {
          email,
          password
        }
      }
    });

    if (res.errors) return;

    await router.push('/profile');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
