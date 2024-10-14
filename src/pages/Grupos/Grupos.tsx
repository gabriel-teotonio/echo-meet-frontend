import { ActionIcon, Button, Flex, Group, Modal, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash, IconUsersGroup } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Grupos.module.css";

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
    const [selectedGrupo, setSelectedGrupo] = useState<IGrupo | null>(null); 
    const [isEditMode, setIsEditMode] = useState(false); 
    const navigate = useNavigate()
  
    const handleEdit = (grupo: IGrupo) => {
        setSelectedGrupo(grupo);
      setIsEditMode(true);
      open();
    };
  
    const handleCreate = () => {
        setSelectedGrupo(null); 
      setIsEditMode(false);
      open();
    };
  
    const handleDeleteUser = (id: number) => {
      if(confirm('Excluir Usuário?')) {
        const newElements = grupos.filter((element) => element.id !== id);
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
        <Button fullWidth mt={'md'} type="submit" onClick={() => isEditMode && selectedGrupo ? handleEdit(selectedGrupo) : handleCreate()}>Salvar</Button>
      </Modal>
        <Flex justify="space-between" align={'center'}>
            <Title order={3}>Grupos</Title>
            <Button onClick={handleCreate}>Criar novo Usuário</Button>
        </Flex>        
        
        {
            grupos.map(grupo => (
                <Flex
                className={classes.grupoItem}
                 w={'300px'} bg={'#161324'} p={'md'}
                 style={{borderRadius: '6px'}}
                 justify={'space-between'} key={grupo.id} mt={'sm'}
                 onClick={() => navigate(`/grupos/${grupo.id}`)}
                 >
                    <Text>{grupo.nome}</Text>
                    <Group>
                        <ActionIcon onClick={(e) =>{
                             e.stopPropagation()
                            handleEdit(grupo)}
                        } 
                        >
                            <IconEdit />
                        </ActionIcon>
                        <ActionIcon 
                        color="red"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(grupo.id)}}
                            >
                            <IconTrash />
                        </ActionIcon>
                    </Group>
                </Flex>
            ))
        }
        
        </>
    )
}
