import { useEffect, useState } from "react";
import { Flex, Text, Modal, Button, Card, TextInput, Select, Divider } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Markdown from "react-markdown";
import classes from './GruposDetail.module.css';
import { IUser } from "../Grupos/Grupos";
import api from "../../utils/api";

export interface IDashboardOption {
    numeric: string[];
    percent: string[];
    problematic: string[];
}

export interface IReuniao {
    summary_text: string;
    meeting_name: string;
    summary_id: string;
    dashboard_data: string;
}

export interface IEmail {
    id: string;
    email: string;
}

export function GrupoDetail() {
    const { id } = useParams();
    const { user } = useAuth();

    const [groupName, setGroupName] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [userEmails, setUserEmails] = useState<string[]>([]);
    const [reunioes, setReunioes] = useState<IReuniao[]>([]);
    const [emails, setEmails] = useState<IEmail[]>([]);
    const [selectedReuniao, setSelectedReuniao] = useState<IReuniao | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Novos estados
    const [selectedValueType, setSelectedValueType] = useState<string>("numeric");
    const [dashboardHtml, setDashboardHtml] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const getSummaries = async () => {
        try {
            const res = await api.get(`grupos/${id}/reunioes`, {
                headers: { Authorization: `Bearer ${user?.access_token}` },
            });
            setReunioes(res.data);
            console.log(res.data)
        } catch (error) {
            console.error("Erro ao buscar resumos:", error);
        }
    };

    const getEmails = async () => {
        try {
            const res = await api.get(`/grupos/${id}/emails`, {
                headers: { Authorization: `Bearer ${user?.access_token}` },
            });
            setEmails(res.data);
        } catch (error) {
            console.error("Erro ao buscar emails:", error);
        }
    };

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await api.get<IUser[]>("/users", {
                    headers: { Authorization: `Bearer ${user?.access_token}` },
                });
                const emailList = response.data.map((user) => user.email);
                setUserEmails(emailList);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
        fetchEmails();
    }, [user?.access_token]);

    const addEmailToGroup = async () => {
        if (newEmail) {
            try {
                await api.post(`/grupos/${id}/emails`, { email: newEmail }, {
                    headers: { Authorization: `Bearer ${user?.access_token}` },
                });
                alert("E-mail adicionado com sucesso!");
                setNewEmail("");
                getEmails();
            } catch (error) {
                console.error("Erro ao adicionar e-mail ao grupo:", error);
            }
        } else {
            alert("Por favor, selecione um e-mail válido.");
        }
    };

    const updateGroupName = async () => {
        try {
            await api.put(`/grupos-update-name/${id}`, { name: groupName }, {
                headers: { Authorization: `Bearer ${user?.access_token}` },
            });
            alert("Nome do grupo atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o nome do grupo:", error);
        }
    };

    useEffect(() => {
        getSummaries();
        getEmails();
    }, [id]);

    const openModal = async (reuniao: IReuniao) => {
        setSelectedReuniao(reuniao);
        setModalOpen(true);
        setDashboardHtml(null); 
        setError(null); 
        // try {
        //     const res = await axios.get<IDashboardOption>(`http://45.169.29.120:8000/dashboard-options/${reuniao.summary_id}`);
        //     const organizedOptions = res.data.reduce((acc: Record<string, string[]>, item: { tipo: string, valor: string }) => {
        //         if (!acc[item.tipo]) {
        //             acc[item.tipo] = [];
        //         }
        //         acc[item.tipo].push(item.valor);
        //         return acc;
        //     }, {});
        //     setDashboardOptions(organizedOptions);
        // } catch (error) {
        //     console.error("Erro ao buscar opções de dashboard:", error);
        // }
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedReuniao(null);
        setSelectedValueType("numeric");
    };

    const fetchDashboard = async () => {
        if (selectedReuniao) {
            try {
                const response = await api.get(`/generate-dashboard/${selectedReuniao.summary_id}/${selectedValueType}`);
                setDashboardHtml(response.data);
                setError(null); 
            } catch (error) {
                console.error("Erro ao buscar o dashboard:", error);
                setError("Dashboard não encontrado ou dados insuficientes.");
                setDashboardHtml(null);
            }
        }
    };

    // const generateDashMetrics = async (valueType: string) => {
    //     try {
    //       const res = await axios.get(`http://45.169.29.120:8000/generate-dashboard-by-metrics/5?metrics=${valueType}`);
    //       console.log("HTML da API:", res.data);
    //       setDashMetricsHtml(res.data);
    //       setError(null)
    //     } catch (error) {
    //       console.error("Erro ao buscar o dashboard:", error);
    //       setError("Metricas de Dashboard não encontrado ou dados insuficientes.");
    //       setDashMetricsHtml(null)
    //     }
    //   };

    return (
        <>
         <Flex py={'md'}>
        <Button variant="light" onClick={() => navigate(-1)}>Voltar</Button>
        </Flex>
            <Text c="gray.3">Detalhes do grupo</Text>
            <TextInput
            bg={'red'}
                value={groupName}
                onChange={(e) => setGroupName(e.currentTarget.value)}
                placeholder="Atualize o nome do grupo"
            />
            <Button onClick={updateGroupName} mt="sm" color="blue">Atualizar Nome</Button>

            <Flex justify={'space-between'} h={'100%'}>
                <Flex gap={'sm'} mt={"lg"} direction={'column'}>
                    <Text fw={'bold'}>Resumos de reuniões</Text>
                    {reunioes.length >= 0 ? reunioes.map((reuniao) => (
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
                    )): <p>Nenhuma reunião encontrada</p>
                }
                </Flex>

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
                        <Text c="dimmed">Nenhum e-mail encontrado para este grupo.</Text>
                    )}

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

            <Modal size={'80%'} opened={modalOpen} onClose={closeModal} title="Detalhes da Reunião">
                {selectedReuniao ? (
                    <>
                        <Text fw={'bold'}>{selectedReuniao.meeting_name}</Text>
                        <Markdown>{selectedReuniao.summary_text}</Markdown>

                        <Divider my={'lg'}/>
                        
                        {/* <Text fw={'bold'}>Opções de métricas para o Dashboard</Text>
                        {dashboardOptions && (
                            Object.entries(dashboardOptions).map(([tipo, valores]) => (
                                <div key={tipo}>
                                    <Text fw="bold">{tipo}</Text>
                                    <Flex gap="sm" mt="xs">
                                        {valores.map((valor: any) => (
                                            <Button key={valor} onClick={() => generateDashMetrics(valor)} variant="light">
                                                {valor}
                                            </Button>
                                        ))}
                                    </Flex>
                                </div>
                            ))
                        )} */}
                        {/* {error && <Text c="red" mt="sm">{error}</Text>}
                        {
                            dashMetricsHtml && (
                                <iframe 
                                srcDoc={dashMetricsHtml}
                                title="Dashboard"
                                style={{ width: '100%', height: '600px', border: 'none' }}
                                />
                            )
                        }  */}

                        <Select
                            value={selectedValueType}
                            onChange={(value) => value && setSelectedValueType(value)}
                            data={[
                                { value: 'numeric', label: 'Numérico' },
                                { value: 'percent', label: 'Percentual' }
                            ]}
                            label="Escolha o tipo de valor"
                            placeholder="Selecione o tipo de valor"
                            mt="md"
                        />
                        <Button onClick={fetchDashboard} mt="sm">Gerar Dashboard</Button>
                        
                        {error && <Text c="red" mt="sm">{error}</Text>}
                        {dashboardHtml && (
                            <iframe 
                            srcDoc={dashboardHtml}
                            title="Dashboard"
                            style={{ width: '100%', height: '600px', border: 'none' }}
                          />
                        )}
                    </>
                ) : (
                    <Text>Erro: Reunião não encontrada.</Text>
                )}
            </Modal>
        </>
    );
}
