import { Card, Text, Button, Flex } from '@mantine/core';

interface ReunioesCardProps {
    titulo: string;
    data: string;
    descricao: string;
    onGerarResumo: () => void; 
}

export const CartaoReuniao: React.FC<ReunioesCardProps> = ({ titulo, data, descricao, onGerarResumo }) => {
    return (
        <Card 
            shadow="sm" 
            padding="lg" 
            style={{ border: '1px solid #55506E', backgroundColor: '#161324' }} // Borda e cor de fundo
            radius="md" // Bordas arredondadas
        >
            <Text size="xl" fw={500} color="white">{titulo}</Text> {/* Alterado 'weight' para 'fw' */}
            <Text color="dimmed" size="sm">{data}</Text> {/* Data */}
            <Text mt="md" color="white">{descricao}</Text> {/* Descrição */}
            <Flex justify="flex-end" mt="md">
                <Button variant="outline" color="#5A3FE5" onClick={onGerarResumo}>Gerar Resumo</Button>
            </Flex>
        </Card>
    );
};

//verificar melhor o funcionamento
//tem uma complexidade por tras 