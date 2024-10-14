import { Title, SimpleGrid, Flex } from '@mantine/core';
import { CartaoReuniao } from '../../components/ReunioesCard/ReunioesCard';

const reunioes = [
    { titulo: 'Reunião com Cliente A', data: '01/10/2024', descricao: 'Discussão sobre o projeto X' },
    { titulo: 'Reunião com Cliente A', data: '01/10/2024', descricao: 'Discussão sobre o projeto X' },
    { titulo: 'Reunião com Cliente A', data: '01/10/2024', descricao: 'Discussão sobre o projeto X' },
    { titulo: 'Reunião com Cliente A', data: '01/10/2024', descricao: 'Discussão sobre o projeto X' },
    { titulo: 'Reunião com Cliente A', data: '01/10/2024', descricao: 'Discussão sobre o projeto X' },
    { titulo: 'Reunião com Cliente A', data: '01/10/2024', descricao: 'Discussão sobre o projeto X' },
    { titulo: 'Reunião com Cliente A', data: '01/10/2024', descricao: 'Discussão sobre o projeto X' },
    { titulo: 'Reunião com Cliente A', data: '01/10/2024', descricao: 'Discussão sobre o projeto X' },
    // ... outras reuniões
];

export const Reunioes = () => {
    const handleGerarResumo = (titulo: string) => {
        alert(`Gerar resumo para: ${titulo}`);
    };

    return (
        <Flex direction="column" mt="lg">
            <Title order={2}>Reuniões</Title>
            <SimpleGrid cols={2} spacing="lg" mt="md">
                {reunioes.map((reuniao, index) => (
                    <CartaoReuniao
                        key={index}
                        titulo={reuniao.titulo}
                        data={reuniao.data}
                        descricao={reuniao.descricao}
                        onGerarResumo={() => handleGerarResumo(reuniao.titulo)}
                    />
                ))}
            </SimpleGrid>
        </Flex>
    );
};
