import { Card, Text, Badge, Button, Flex } from '@mantine/core';

export function CardSummary() {
  return (
    <Card
    style={{
        border: '1px solid #55506E'
    }} 
    w={400} bg='#161324' c='white' shadow="sm" padding="lg" radius="md">
    <Text size='xl' fw={500}>Planejamento de software</Text>
      <Text lineClamp={1} size="sm" c="dimmed">
        Principais pontos da reunião de Planejamento do software de gerenciamento de reunião.
      </Text>
      <Text size="xs" c="dimmed">05/09 - Quinta-Feira, Setembro de 2024</Text>
    
    <Flex mt={'xs'} gap={'4px'}>
        <Badge size='xs' color="rgba(195, 7, 242, 0.16)">Desenvolvimento web</Badge>
        <Badge size='xs' color="rgba(195, 7, 242, 0.16)">Planejamento</Badge>
    </Flex>

      <Button variant='outline' color="#5A3FE5" fullWidth mt="md" radius="md">
        Detalhes da reunião
      </Button>
    </Card>
  );
}