import React, { useState } from 'react';
import { Card, TextInput, Button, Title, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');

  const identificadorEnviar = (event: React.FormEvent) => {
    event.preventDefault();
    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    console.log('Registro:', { nome, email, senha });
  };

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
        <Title order={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Registre-se</Title>
        <form onSubmit={identificadorEnviar}>
          <TextInput 
            placeholder="Nome" 
            style={{ marginBottom: 10 }} 
            value={nome}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <TextInput 
            placeholder="Email" 
            style={{ marginBottom: 10 }} 
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <TextInput 
            placeholder="Criar Senha" 
            type="password" 
            style={{ marginBottom: 20 }} 
            value={senha}
            onChange={(event) => setPassword(event.currentTarget.value)}
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
            type="submit"
          >
            Registrar
          </Button>
        </form>
        <Text color="dimmed" style={{ marginTop: 10, textAlign: 'center' }}>
          Já tem uma conta?{' '}
          <Link to="/login" style={{ color: '#3A21B8' }}>
            Faça login
          </Link>
        </Text>
      </Card>
    </Flex>
  );
};
