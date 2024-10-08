import React from 'react';
import { Card, TextInput, Button, Title, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
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
        <TextInput 
          placeholder="Email" 
          style={{ marginBottom: 10 }} 
          color="dimmed"
        />
        <TextInput 
          placeholder="Senha" 
          type="password" 
          style={{ marginBottom: 20 }} 
          color="dimmed"
        />
        
        <Button 
          variant="outline" 
          style={{
            background: 'linear-gradient(#3A21B8, #231471)',
            color: 'white',
            border: 0,
            transition: 'all 0.2s ease-in-out',
            height: '40px',
            width: '100%',
          }}
        >
          Entrar
        </Button>
        
        <Text color="dimmed" style={{ marginTop: 10, textAlign: 'center' }}>
          <Link to="./Register" style={{ color: '#3A21B8' }}>
            Esqueceu a senha?
          </Link>
        </Text>
      </Card>
    </Flex>
  );
};
