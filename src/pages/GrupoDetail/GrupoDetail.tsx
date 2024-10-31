import { useEffect, useState } from "react";
import { Flex, Text, Modal, Button, Card, TextInput, Select } from "@mantine/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Markdown from "react-markdown";
import classes from './GruposDetail.module.css';
import { IUser } from "../Grupos/Grupos";

export interface IDashboardOption {
    numeric: string[];
    percent: string[];
    problematic: string[];
}

export interface IReuniao {
    summary_text: string;
    meeting_name: string;
    summary_id: string;
}

export interface IEmail {
    id: string;
    email: string;
}

export function GrupoDetail() {
    const { id } = useParams();
    const { user } = useAuth();

    const [groupName, setGroupName] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>(""); // Email a ser adicionado
    const [userEmails, setUserEmails] = useState<string[]>([]); // Opções de emails
    const [reunioes, setReunioes] = useState<IReuniao[]>([]);
    const [emails, setEmails] = useState<IEmail[]>([]);
    const [selectedReuniao, setSelectedReuniao] = useState<IReuniao | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Função para buscar os resumos das reuniões
    const getSummaries = async () => {
        try {
            const res = await axios.get(`http://45.169.29.120:8000/grupos/${id}/reunioes`, {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            setReunioes(res.data);
        } catch (error) {
            console.error("Erro ao buscar resumos:", error);
        }
    };

    // Função para buscar os e-mails dos membros do grupo
    const getEmails = async () => {
        try {
            const res = await axios.get(`http://45.169.29.120:8000/grupos/${id}/emails`, {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            setEmails(res.data);
        } catch (error) {
            console.error("Erro ao buscar emails:", error);
        }
    };

    // Função para buscar emails dos usuários existentes para o Select
    useEffect(() => {
        const fetchEmails = async () => {
          try {
            const response = await axios.get<IUser[]>("http://45.169.29.120:8000/users", {
              headers: {
                Authorization: `Bearer ${user?.access_token}`, // Inclui o token no header da requisição
              },
            });
            const emailList = response.data.map((user) => user.email); // Extrai apenas os emails
            setUserEmails(emailList); // Popula a lista de emails para o MultiSelect
          } catch (error) {
            console.error("Erro ao buscar usuários:", error);
          }
        };
        fetchEmails();
      }, [user?.access_token]);

    // Função para adicionar um novo e-mail ao grupo
    const addEmailToGroup = async () => {
        if (newEmail) {
            try {
                await axios.post(`http://45.169.29.120:8000/grupos/${id}/emails`, 
                    { email: newEmail },
                    {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        },
                    }
                );
                alert("E-mail adicionado com sucesso!");
                setNewEmail(""); // Limpa o campo após adicionar
                getEmails(); // Atualiza a lista de e-mails
            } catch (error) {
                console.error("Erro ao adicionar e-mail ao grupo:", error);
            }
        } else {
            alert("Por favor, selecione um e-mail válido.");
        }
    };

    const updateGroupName = async () => {
        try {
            await axios.put(`http://45.169.29.120:8000/grupos-update-name/${id}`, 
                { name: groupName },
                {
                    headers: {
                        Authorization: `Bearer ${user?.access_token}`,
                    },
                }
            );
            alert("Nome do grupo atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o nome do grupo:", error);
        }
    };

    useEffect(() => {
        getSummaries();
        getEmails();
    }, [id]);

    const openModal = (reuniao: IReuniao) => {
        setSelectedReuniao(reuniao);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedReuniao(null);
    };

    return (
        <>
            <Text c="gray.3">Detalhes do grupo</Text>
            <TextInput
                value={groupName}
                onChange={(e) => setGroupName(e.currentTarget.value)}
                placeholder="Atualize o nome do grupo"
            />
            <Button onClick={updateGroupName} mt="sm" color="blue">Atualizar Nome</Button>

            <Flex justify={'space-between'} h={'100%'}>
                {/* Lista de Resumos das Reuniões */}
                <Flex gap={'sm'} mt={"lg"} direction={'column'}>
                    <Text fw={'bold'}>Resumos de reuniões</Text>
                    {reunioes.map((reuniao) => (
                        <Card
                            key={reuniao.summary_id}
                            style={{ border: '1px solid #55506E' }}
                            w={400} bg='#161324' c='white' shadow="sm" padding="lg" radius="md"
                        >
                            <Text size='xl' fw={500}>{reuniao.meeting_name}</Text>
                            <Text lineClamp={1} size="sm" c="dimmed">{reuniao.summary_text}</Text>
                            <Button onClick={() => openModal(reuniao)} variant='outline' color="#5A3FE5" fullWidth mt="md" radius="md">
                                Detalhes da reunião
                            </Button>
                        </Card>
                    ))}
                </Flex>

                {/* Lista de E-mails dos Membros */}
                <Flex 
                    className={classes.participantes}
                    bg={'#161324'} w={'400px'} mt={"lg"} direction={'column'}
                    style={{ borderRadius: '10px' }}
                    p={'md'} gap={'xs'} h={'fit-content'} mih={'400px'} mah={'800px'}
                >
                    <Text fw={'bold'}>E-mails dos Membros</Text>
                    {emails.length > 0 ? (
                        emails.map(email => (
                            <Flex
                                key={email.id}
                                style={{ borderRadius: '6px' }}
                                bg={'#161346'} p={'sm'} gap={'sm'} direction={'row'}
                            >
                                <Text>{email.email}</Text>
                            </Flex>
                        ))
                    ) : (
                        <Text color="dimmed">Nenhum e-mail encontrado para este grupo.</Text>
                    )}

                    {/* Select para adicionar novo e-mail */}
                    <Select
                        searchable
                        value={newEmail}
                        onChange={(value) => value && setNewEmail(value)}
                        data={userEmails}
                        placeholder="Pesquisar e adicionar e-mail"
                        mt="md"
                    />
                    <Button onClick={addEmailToGroup} color="green" mt="sm">
                        Adicionar E-mail
                    </Button>
                </Flex>
            </Flex>

            {/* Modal para mostrar detalhes da reunião */}
            <Modal 
                opened={modalOpen} 
                onClose={closeModal} 
                title="Detalhes da Reunião"
            >
                {selectedReuniao ? (
                    <>
                        <Text fw={'bold'}>{selectedReuniao.meeting_name}</Text>
                        <Markdown>{selectedReuniao.summary_text}</Markdown>
                        <Button onClick={closeModal} mt="md">Fechar</Button>
                    </>
                ) : (
                    <Text>Carregando...</Text>
                )}
            </Modal>
        </>
    );
}
