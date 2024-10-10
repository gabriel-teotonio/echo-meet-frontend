import { ActionIcon, Group, Table, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const elements = [
    { email: 'joao.silva@finance.com', mass: 65.38, symbol: 'JS', name: 'João Silva', grupo: 'Departamento Financeiro' },
    { email: 'maria.souza@finance.com', mass: 78.96, symbol: 'MS', name: 'Maria Souza', grupo: 'Departamento Financeiro' },
    { email: 'antonio.lima@finance.com', mass: 92.17, symbol: 'AL', name: 'Antônio Lima', grupo: 'Departamento Financeiro' },
    { email: 'claudia.oliveira@finance.com', mass: 55.84, symbol: 'CO', name: 'Cláudia Oliveira', grupo: 'Departamento Financeiro' },
    { email: 'roberto.pereira@finance.com', mass: 101.03, symbol: 'RP', name: 'Roberto Pereira', grupo: 'Departamento Financeiro' }
  ];
  

export function Users() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.email}</Table.Td>
        <Table.Td>{element.grupo}</Table.Td>
        <Table.Td>
        <Group justify='center'>
            <ActionIcon bg={'#5A3FE5'}>
            <IconEdit size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon bg={'#5A3FE5'}>
            <IconTrash size={18} stroke={1.5} />
            </ActionIcon>
      </Group>    
        </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
    <Title mb={'md'} order={3}>Usuários</Title>
    <Table 
    bg={'#161324'} 
    style={{borderRadius: '10px'}}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Grupo</Table.Th>
          <Table.Th ta={'center'}>Ação</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </>
  );
}