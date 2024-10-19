import { Flex, Text, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import { CardSummary } from "../../components/CardSummary/CardSummary";
import classes from './GruposDetail.module.css'

const participantes = [
    'João Felipe',
    'Maria Silva', 
    'Antonio Pereira',
     'Luiz',
    'Luciana',
    'Jessica',
    'Jessica',
    'Jessica',
]

export function GrupoDetail() {
    const { id } = useParams();

    return (
        <>
         <Text c="gray.3">Detalhes do grupo</Text>
        <Title fz={'h2'}>Grupo {id}</Title>

            <Flex //container
            justify={'space-between'}
            h={'100%'}
            > 
              {/* lista de resumos */}
              <Flex gap={'sm'} mt={"lg"} direction={'column'}>
                <Text fw={'bold'}>Resumos de reuniões</Text>
                <CardSummary />
                <CardSummary />
                <CardSummary />
            </Flex>

            <Flex 
            className={classes.participantes}
            bg={'#161324'} w={'400px'} mt={"lg"} direction={'column'}
            style={{borderRadius: '10px'}}
            p={'md'} gap={'xs'} h={'fit-content'} mih={'400px'} mah={'800px'}
            >
                <Text>Participantes</Text>
                {participantes.map(participante => (
                    <Flex
                    key={participante}
                    style={{borderRadius: '6px'}}
                    bg={'#161346'} p={'sm'} gap={'sm'} direction={'row'}
                    >
                        <Text>{participante}</Text>
                    </Flex>
                ))}
            </Flex>

          
        </Flex>
        </>
    )
}
