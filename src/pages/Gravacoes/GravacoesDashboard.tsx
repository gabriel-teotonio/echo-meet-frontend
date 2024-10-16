import React from 'react';
import { Container, Flex, Text } from '@mantine/core';
import GravacoesCard from '../../components/GravacoesCard/GravacoesCard';

interface Gravacao {
  id: number;
  titulo: string;
  data: string;
  descricao: string; // Adicione uma descrição
}

// Dados simulados de gravações
const gravacoes: Gravacao[] = [
  {
    id: 1,
    titulo: 'Reunião semanal - Projeto X',
    data: '2024-10-15',
    descricao: 'Resumo da reunião onde discutimos os próximos passos do projeto X.',
  },
  {
    id: 2,
    titulo: 'Planejamento de Sprint',
    data: '2024-10-10',
    descricao: 'Planejamento da próxima sprint com foco em melhorias no sistema.',
  },
];

const DashboardGravacoes: React.FC = () => {
  const handleGerarResumo = (id: number) => {
    console.log(`Gerando resumo para a gravação com ID ${id}`);
  };

  const handleReproduzirAudio = (id: number) => {
    console.log(`Tocando áudio da gravação com ID ${id}`);
  };

  return (
    <Container>
      <Text ta="center" size="xl" fw={700} mb="xl" color="white">
        Dashboard de Gravações
      </Text>

      <Flex direction="column" gap="md">
        {gravacoes.map((gravacao) => (
          <GravacoesCard
            key={gravacao.id}
            gravacao={gravacao}
            aoGerarResumo={handleGerarResumo}
            aoReproduzirAudio={handleReproduzirAudio}
          />
        ))}
      </Flex>
    </Container>
  );
};

export default DashboardGravacoes;
