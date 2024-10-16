import React from 'react';
import { Card, Text, Button, Flex } from '@mantine/core';


interface Gravacao {
  id: number;
  titulo: string;
  data: string;
  descricao: string; 
}


interface GravacoesCardProps {
  gravacao: Gravacao;
  aoGerarResumo: (id: number) => void;
  aoReproduzirAudio: (id: number) => void;
}


const GravacoesCard: React.FC<GravacoesCardProps> = ({ gravacao, aoGerarResumo, aoReproduzirAudio }) => {
  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      style={{ border: '1px solid #55506E', backgroundColor: '#161324' }} 
      radius="md" 
    >
      <Text size="xl" fw={500} color="white">{gravacao.titulo}</Text>
      <Text color="dimmed" size="sm">{gravacao.data}</Text>
      <Text mt="md" color="white">{gravacao.descricao}</Text> {/* Descrição do áudio */}
      <Flex justify="flex-end" mt="md">
        <Button variant="outline" color="#5A3FE5" onClick={() => aoGerarResumo(gravacao.id)}>
          Gerar Resumo
        </Button>
        <Button color="teal" onClick={() => aoReproduzirAudio(gravacao.id)} style={{ marginLeft: '10px' }}>
          Play
        </Button>
      </Flex>
    </Card>
  );
};

export default GravacoesCard;
