import { useEffect, useState } from "react";
import { Flex, Text, Title, Modal, Button, Card } from "@mantine/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Markdown from "react-markdown";
import classes from './GruposDetail.module.css';


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
            <Title fz={'h2'}>Grupo {id}</Title>

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
