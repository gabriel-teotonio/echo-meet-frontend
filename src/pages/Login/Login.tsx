import React, { useEffect, useState } from 'react';
import { Card, TextInput, Button, Title, Flex, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Login: React.FC = () => {
  const { login, isLoading, error, user } = useAuth(); // Usa o contexto
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/'); // Redireciona para a página principal
    }
  }, [user, navigate]); 

  return (
    <Flex
      style={{ backgroundColor: '#000', height: '100vh' }}
      align="center"
      justify="center"
    >
      <Card 
        style={{ border: '1px solid #55506E', width: 400, backgroundColor: '#161324', color: 'white', padding: 'lg' }}
        shadow="sm"
        radius="md"
      >
        <Title order={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Login</Title>
        
        <form onSubmit={handleLogin}>
          <TextInput 
            placeholder="Email" 
            style={{ marginBottom: 10 }} 
            color="dimmed"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput 
            placeholder="Senha" 
            type="password" 
            style={{ marginBottom: 20 }} 
            color="dimmed"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Button 
            variant="outline" 
            type='submit'
            style={{
              background: 'linear-gradient(#3A21B8, #231471)',
              color: 'white',
              border: 0,
              transition: 'all 0.2s ease-in-out',
              height: '40px',
              width: '100%',
            }}
          >
            {isLoading ? 'Carregando...' : 'Entrar'}
          </Button>
        </form>
        
        <Text color="dimmed" style={{ marginTop: 10, textAlign: 'center' }}>
          <Link to="./Register" style={{ color: '#3A21B8' }}>
            Esqueceu a senha?
          </Link>
        </Text>
      </Card>
    </Flex>
  );
};
