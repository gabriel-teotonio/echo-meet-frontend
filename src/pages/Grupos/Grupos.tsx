import { useEffect, useState } from "react";
import { MultiSelect, Button, Modal, TextInput, Flex, Text, Group, ActionIcon, Box } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import classes from "./Grupos.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export interface IUser {
  email: string;
  name: string;
}

interface IGroup {
  id: number;
  name: string;
  emails: string[];
}



export function Grupos() {
  const [emails, setEmails] = useState<string[]>([]); // Estado para armazenar os emails
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]); // Emails escolhidos no MultiSelect
  const [groupName, setGroupName] = useState<string>(""); // Nome do grupo
  const [groups, setGroups] = useState<IGroup[]>([]); // Grupos cadastrados
  const [opened, setOpened] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); 
  const [selectedGrupo, setSelectedGrupo] = useState<IGroup | null>(null); 
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth();
  const navigate = useNavigate();

  // Função para buscar os emails dos usuários cadastrados
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get<IUser[]>("https://app.echomeets.online/users", {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        const emailList = response.data.map((user) => user.email); // Extrai apenas os emails
        setEmails(emailList); // Popula a lista de emails para o MultiSelect
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchEmails();
  }, [user?.access_token]);

  // Função para buscar grupos
  useEffect(() => {

    const fetchGroups = async () => {
      try {
        const response = await axios.get("https://app.echomeets.online/groupsonly/", {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        setGroups(response.data);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    };
    fetchGroups();
  }, [user?.access_token, isLoading]);

  // Função chamada ao criar ou editar o grupo
  const handleSaveGroup = async () => {
    if (!groupName || selectedEmails.length === 0) {
      console.log("Nome do grupo ou lista de emails não preenchidos.");
      return;
    }

    const groupData = {
      name: groupName,
      emails: selectedEmails.map((email) => ({ email })),
    };
    try {
      setIsLoading(true)
      if (isEditMode && selectedGrupo) {
        // Atualizando grupo existente
        await axios.put(`https://app.echomeets.online/groups/${selectedGrupo.id}`, groupData,{
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        console.log("Grupo atualizado com sucesso!");
      } else {
        // Criando novo grupo
        await axios.post("https://app.echomeets.online/groups/", groupData, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        console.log("Grupo criado com sucesso!");
      }
      // Atualiza a lista de grupos após a ação
      setOpened(false);
    } catch (error) {
      console.error("Erro ao salvar grupo:", error);
    }finally {
      setIsLoading(false)
    }
  };

  // Função para editar o grupo
  const handleEdit = (grupo: IGroup) => {
    setSelectedGrupo(grupo);
    setGroupName(grupo.name); 
    setIsEditMode(true);
    setOpened(true);
  };

  // Função para excluir o grupo
  const handleDeleteGroup = async (id: number) => {
    if (confirm("Excluir Grupo?")) {
      try {
        await axios.delete(`https://app.echomeets.online/grupos/${id}`, { 
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        setGroups(groups.filter((group) => group.id !== id)); // Remove o grupo da lista no frontend
        console.log("Grupo excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir grupo:", error);
      }
    }
  };

  return (
    <>
    <Flex py={'md'}>
    <Button variant="light" onClick={() => navigate(-1)}>Voltar</Button>
    </Flex>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={isEditMode ? "Editar Grupo" : "Criar novo Grupo"}
        centered
      >
        <Flex gap={"sm"} direction={"column"}>
          <TextInput
            label="Nome do Grupo"
            placeholder="Digite o nome do grupo"
            value={groupName}
            onChange={(e) => setGroupName(e.currentTarget.value)}
          />

        <Box 
            hidden={isEditMode}
        >

          <MultiSelect
            label="Adicionar emails"
            placeholder="Selecione os emails"
            limit={8}
            data={emails} // Lista de emails buscados do sistema
            value={selectedEmails} // Emails selecionados pelo usuário
            onChange={setSelectedEmails} // Atualiza o estado com os emails selecionados
            searchable
            />
            </Box>
        </Flex>
        <Button fullWidth mt={"md"} onClick={handleSaveGroup}>
          {isLoading ? isEditMode ? "Salvar Alterações" : "Criar Grupo" : 'criando grupo'}
        </Button>
      </Modal>

      <Button onClick={() => {
        setOpened(true);
        setIsEditMode(false);
      }}>Criar novo Grupo</Button>

      {groups.map((grupo) => (
        <Flex
          className={classes.grupoItem}
          w={"300px"}
          bg={"#161324"}
          p={"md"}
          style={{ borderRadius: "6px" }}
          justify={"space-between"}
          mt={"sm"}
          key={grupo.id}
          onClick={() => navigate(`/grupos/${grupo.id}`)}
        >
          <Text>{grupo.name}</Text>
          <Group>
            <ActionIcon
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(grupo);
              }}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteGroup(grupo.id);
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
        </Flex>
      ))}
    </>
  );
}
