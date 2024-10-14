import { ActionIcon, Button, Flex, Group, Modal, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash, IconUsersGroup } from "@tabler/icons-react";
import { useState } from "react";

interface IGrupo {
    id: number;
    nome: string;
}

const gruposEl:IGrupo[] = [
    {
        id: 1,
        nome: 'Grupo 1'
    },
    {
        id: 2,
        nome: 'Grupo 2'
    },
    {
        id: 3,
        nome: 'Grupo 3'
    }
]

export function Grupos() {
    const [grupos, setGrupos] = useState<IGrupo[]>(gruposEl);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedGrupo, setSelectedGrupo] = useState<IGrupo | null>(null); // Estado para armazenar o usuário selecionado
    const [isEditMode, setIsEditMode] = useState(false); // Estado para controlar o modo de edição
  
  
    const handleEdit = (grupo: IGrupo) => {
        setSelectedGrupo(grupo);
      setIsEditMode(true);
      open();
    };
  
    const handleCreate = () => {
        setSelectedGrupo(null); // Limpa o usuário selecionado ao criar um novo
      setIsEditMode(false);
      open();
    };
  
    const handleDeleteUser = (userId: number) => {
      if(confirm('Excluir Usuário?')) {
        const newElements = grupos.filter((element) => element.id !== userId);
        setGrupos(newElements);
      }
    }
  
    return (
        <>
         <Modal opened={opened} onClose={close} title={isEditMode ? 'Editar Grupo' : 'Criar novo Grupo'} centered>
        <Flex gap={'sm'} direction={'column'}>
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<IconUsersGroup size={14} />}
            label="Nome do grupo"
            placeholder="nome do grupo"
            value={selectedGrupo ? selectedGrupo.nome : ''} 
            />
        </Flex>
        <Button fullWidth mt={'md'} type="submit" onClick={() => isEditMode ? handleEdit(selectedGrupo) : handleCreate()}>Salvar</Button>
      </Modal>
        <Flex justify="space-between" align={'center'}>
            <Title order={3}>Usuários</Title>
            <Button onClick={handleCreate}>Criar novo Usuário</Button>
        </Flex>        
        
        {
            gruposEl.map(grupo => (
                <Flex
                 w={'300px'} bg={'#161324'} p={'md'}
                 style={{borderRadius: '6px'}}
                 justify={'space-between'} key={grupo.id} mt={'sm'}
                 >
                    <Text>{grupo.nome}</Text>
                    <Group>
                        <ActionIcon  onClick={() => handleEdit(grupo)}>
                            <IconEdit />
                        </ActionIcon>
                        <ActionIcon>
                            <IconTrash />
                        </ActionIcon>
                    </Group>
                </Flex>
            ))
        }
        
        </>
    )
}
