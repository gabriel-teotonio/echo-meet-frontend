import { ActionIcon, Button, Flex, Group, Modal, Select, Table, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { IconEdit, IconMail, IconPassword, IconTrash, IconUser } from '@tabler/icons-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface IUser {
  id: number;
  email: string;
  name: string;
  user_type: string;
  password: string;
}

export function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newUser, setNewUser] = useState<IUser>({id: 0, email: '', name: '', user_type: '', password: '' });
  const { user } = useAuth();

  // Função para carregar os usuários ao montar o componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<IUser[]>('http://45.169.29.120:8000/users', {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, [user?.access_token]);

  // Função para criar ou atualizar usuário
  const handleSaveUser = async () => {
    try {
      if (isEditMode && selectedUser) {
        // Atualizar o usuário existente
        await axios.put(`http://45.169.29.120:8000/users/${selectedUser.id}`, newUser, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        setUsers((prev) =>
          prev.map((u) => (u.email === selectedUser.email ? newUser : u))
        );
      } else {
        // Criar novo usuário
        await axios.post('http://45.169.29.120:8000/users', newUser, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        setUsers((prev) => [...prev, newUser]);
      }
      close();
      setIsEditMode(false);
      setNewUser({id: 0, email: '', name: '', user_type: '', password: '' });
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setNewUser(user);
    setIsEditMode(true);
    open();
  };

  // Função para excluir usuário
  const handleDeleteUser = async (userId: number) => {
    if (confirm('Excluir Usuário?')) {
      try {
        await axios.delete(`http://45.169.29.120:8000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  return (
    <>
      {/* Modal para criar/editar usuários */}
      <Modal opened={opened} onClose={close} title={isEditMode ? 'Editar Usuário' : 'Criar novo Usuário'} centered>
        <Flex gap={'sm'} direction={'column'}>
          <TextInput
            leftSection={<IconUser size={14} />}
            label="Nome completo"
            placeholder="Nome completo"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextInput
            leftSection={<IconMail size={14} />}
            label="Email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextInput
            leftSection={<IconPassword size={14} />}
            label="Senha"
            placeholder="Senha"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <Select
            label="Selecionar tipo de user"
            placeholder="Escolha um tipo de user"
            data={['admin', 'client']}
            searchable
            nothingFoundMessage="Nenhum grupo encontrado"
            value={newUser.user_type}
            onChange={(value) => setNewUser({ ...newUser, user_type: value || '' })}
          />
          <Button onClick={handleSaveUser}>{isEditMode ? 'Salvar Alterações' : 'Criar Usuário'}</Button>
        </Flex>
      </Modal>

      {/* Cabeçalho */}
      <Flex justify="space-between" align={'center'} mb="lg">
        <Title order={3}>Usuários</Title>
        <Button onClick={() => { setIsEditMode(false); setNewUser({id: 0, email: '', name: '', user_type: '', password: '' }); open(); }}>Criar novo Usuário</Button>
      </Flex>

      {/* Tabela de usuários */}
      <Table mt={'lg'} bg={'#161324'} style={{ borderRadius: '10px' }}>
      <Table.Thead>
          <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Tipo de Usuário</Table.Th>
            <Table.Th ta={'center'}>Ação</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user) => (
            <Table.Tr key={user.email}>
              <Table.Td>{user.name}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>{user.user_type}</Table.Td>
              <Table.Td>
                <Group justify="center">
                  <ActionIcon bg={'#5A3FE5'} onClick={() => handleEditUser(user)}>
                    <IconEdit size={18} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon onClick={() => handleDeleteUser(user.id)} bg={'#5A3FE5'}>
                    <IconTrash size={18} stroke={1.5} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr> 
          ))}
        </Table.Tbody>
        </Table>
    </>
  );
}
