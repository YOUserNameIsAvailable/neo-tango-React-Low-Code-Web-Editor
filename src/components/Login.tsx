import React, { useState } from 'react';
import { Box, Input, Button, Message } from '@alifd/next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from 'src/utils/firebase';

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = () => {
    if (!email || !password) {
      Message.error('Please enter email and password');
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        Message.success('Login Successful');
        window.location.reload();
      })
      .catch((error) => {
        console.log({ error });
        Message.error('Email or password is not correct');

        setLoading(false);
      });
  };

  return (
    <Box
      style={{
        gap: '20px',
        maxWidth: '450px',
        margin: '0 auto',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <img src="/favicon.png" alt="logo" style={{ width: '90px', margin: '0 auto' }} />
      <p style={{ fontSize: '24px', color: 'black', textAlign: 'center', marginBottom: '28px' }}>
        Login to the account
      </p>
      <Input
        value={email}
        onChange={(value) => setEmail(value)}
        htmlType="email"
        placeholder="Email"
        size="large"
        style={{ width: '100%' }}
        required
      />
      <Input.Password
        value={password}
        onChange={(value) => setPassword(value)}
        placeholder="Password"
        size="large"
        style={{ width: '100%' }}
        required
      />
      <Button htmlType="submit" onClick={onSubmit} size="large" type="primary" loading={loading}>
        Login
      </Button>
      <a href="/" style={{ fontSize: '14px', textAlign: 'center', marginTop: '10px' }}>
        Go To Home
      </a>
    </Box>
  );
};
