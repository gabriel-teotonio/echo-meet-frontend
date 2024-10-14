import { ActionIcon, Button, Flex, Group, Modal, Select, Table, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { IconEdit, IconMail, IconTrash, IconUser } from '@tabler/icons-react';

interface IUser{
  email: string;
  name: string;
  grupo: string;
}

const elements = [
  { email: 'joao.silva@finance.com', name: 'João Silva', grupo: 'Departamento Financeiro' },
  { email: 'maria.souza@finance.com', name: 'Maria Souza', grupo: 'Departamento Financeiro' },
  { email: 'antonio.lima@finance.com', name: 'Antônio Lima', grupo: 'Departamento Financeiro' },
  { email: 'claudia.oliveira@finance.com', name: 'Cláudia Oliveira', grupo: 'Departamento Financeiro' },
  { email: 'roberto.pereira@finance.com',  name: 'Roberto Pereira', grupo: 'Departamento Financeiro' }
];

export function Users() {
  const [users, setUsers] = useState<IUser[]>(elements);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null); // Estado para armazenar o usuário selecionado
  const [isEditMode, setIsEditMode] = useState(false); // Estado para controlar o modo de edição


  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setIsEditMode(true);
    open();
  };

  const handleCreate = () => {
    setSelectedUser(null); // Limpa o usuário selecionado ao criar um novo
    setIsEditMode(false);
    open();
  };

  const handleDeleteUser = (userId: string) => {
    if(confirm('Excluir Usuário?')) {
      const newElements = users.filter((element) => element.email !== userId);
      setUsers(newElements);
    }
  }



  return (
    <>
      <Modal opened={opened} onClose={close} title={isEditMode ? 'Editar Usuário' : 'Criar novo Usuário'} centered>
        <Flex gap={'sm'} direction={'column'}>
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<IconUser size={14} />}
            label="Nome completo"
            placeholder="nome completo"
            value={selectedUser ? selectedUser.name : ''} // Preenche com o nome do usuário se estiver editando
          />
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<IconMail size={14} />}
            label="Email"
            placeholder="Email"
            value={selectedUser ? selectedUser.email : ''} // Preenche com o email do usuário se estiver editando
          />
          <Select
            label="Selecionar grupo"
            placeholder="escolha um grupo"
            data={['Financeiro', 'Tecnologia', 'RH', 'Administrativo']}
            searchable
            nothingFoundMessage="Nenhum grupo encontrado"
            value={selectedUser ? selectedUser.grupo : ''} // Preenche com o grupo do usuário se estiver editando
          />
        </Flex>
      </Modal>

      <Flex justify="space-between" align={'center'}>
        <Title order={3}>Usuários</Title>
        <Button onClick={handleCreate}>Criar novo Usuário</Button>
      </Flex>

      <Table mt={'lg'} bg={'#161324'} style={{ borderRadius: '10px' }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Grupo</Table.Th>
            <Table.Th ta={'center'}>Ação</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            users.map((element) => (
              <Table.Tr key={element.name}>
                <Table.Td>{element.name}</Table.Td>
                <Table.Td>{element.email}</Table.Td>
                <Table.Td>{element.grupo}</Table.Td>
                <Table.Td>
                  <Group justify="center">
                    <ActionIcon bg={'#5A3FE5'} onClick={() => handleEdit(element)}>
                      <IconEdit size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon onClick={() => handleDeleteUser(element.email)} bg={'#5A3FE5'}>
                      <IconTrash size={18} stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>
    </>
  );
}
